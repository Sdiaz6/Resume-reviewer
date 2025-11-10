def route_requests(numTargets, maxConnectionsPerTarget, requests):

    load = [0] * numTargets

    conns = {}                   # connectionId -> (t_idx, userId, objectId)

    orig = {}                    # connectionId -> (userId, objectId) (for shutdown reroute)

    obj_target = {}

    obj_count = {}

    by_target = [set() for _ in range(numTargets)]

    log = []



    def eligible_targets(blocked=None):

        for t in range(numTargets):

            if blocked is not None and t == blocked:

                continue

            if maxConnectionsPerTarget is None or load[t] < maxConnectionsPerTarget:

                yield t



    def choose_target(blocked=None):

        best = None

        for t in eligible_targets(blocked):

            if best is None or load[t] < load[best] or (load[t] == load[best] and t < best):

                best = t

        return best



    def attach(connId, userId, objectId, blocked=None):

        if objectId in obj_target:

            t = obj_target[objectId]

            if (blocked is not None and t == blocked) or (maxConnectionsPerTarget is not None and load[t] >= maxConnectionsPerTarget):

                return False

        else:

            t = choose_target(blocked)

            if t is None:

                return False

            obj_target[objectId] = t



        conns[connId] = (t, userId, objectId)

        orig.setdefault(connId, (userId, objectId))

        load[t] += 1

        by_target[t].add(connId)

        obj_count[objectId] = obj_count.get(objectId, 0) + 1

        log.append(f"{connId},{userId},{t+1}")

        return True



    def detach(connId):

        info = conns.pop(connId, None)

        if info is None:

            return

        t, _, objectId = info

        if connId in by_target[t]:

            by_target[t].remove(connId)

        load[t] -= 1

        obj_count[objectId] -= 1

        if obj_count[objectId] == 0:

            obj_count.pop(objectId, None)

            obj_target.pop(objectId, None)



    for line in requests:

        parts = line.strip().split(",")

        action = parts[0]



        if action == "CONNECT":

            _, connId, userId, objectId = parts

            attach(connId, userId, objectId)



        elif action == "DISCONNECT":

            _, connId, _, _ = parts

            detach(connId)



        elif action == "SHUTDOWN":

            _, target_str = parts

            shutting = int(target_str) - 1



            # Evict all active connections on the shutting target in connectionId order

            evict_ids = sorted(by_target[shutting])

            for cid in evict_ids:

                detach(cid)



            # Reroute them one by one (object affinity applies; 'shutting' is blocked)

            for cid in evict_ids:

                userId, objectId = orig[cid]

                attach(cid, userId, objectId, blocked=shutting)



            # Target is immediately usable again for future requests (no action needed)



        else:

            # Unknown action → ignore

            continue



    return log


