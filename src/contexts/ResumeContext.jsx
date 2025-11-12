import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const ResumeContext = createContext({});

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [currentResume, setCurrentResume] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load all resumes for current user
  const loadResumes = useCallback(async () => {
    if (!currentUser) {
      setResumes([]);
      return;
    }

    setLoading(true);
    try {
      const q = query(
        collection(db, 'resumes'),
        where('userId', '==', currentUser.uid),
        orderBy('updatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const resumesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResumes(resumesData);
    } catch (error) {
      console.error('Error loading resumes:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  // Load a specific resume
  const loadResume = async (resumeId) => {
    if (!currentUser) return null;

    setLoading(true);
    try {
      const resumeDoc = await getDoc(doc(db, 'resumes', resumeId));
      if (resumeDoc.exists()) {
        const resumeData = { id: resumeDoc.id, ...resumeDoc.data() };
        setCurrentResume(resumeData);
        return resumeData;
      }
      return null;
    } catch (error) {
      console.error('Error loading resume:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new resume
  const createResume = async (resumeData, template = 'modern') => {
    if (!currentUser) throw new Error('User must be logged in');

    const resumeId = uuidv4();
    const newResume = {
      id: resumeId,
      userId: currentUser.uid,
      template,
      data: resumeData,
      version: 1,
      versions: [{
        version: 1,
        data: resumeData,
        createdAt: new Date().toISOString(),
        changes: 'Initial version'
      }],
      shareId: uuidv4(),
      isPublic: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      atsScore: null,
      analytics: {
        views: 0,
        exports: 0,
        shares: 0
      }
    };

    try {
      await setDoc(doc(db, 'resumes', resumeId), newResume);
      await loadResumes();
      return newResume;
    } catch (error) {
      console.error('Error creating resume:', error);
      throw error;
    }
  };

  // Update resume
  const updateResume = async (resumeId, resumeData, changes = 'Updated resume') => {
    if (!currentUser) throw new Error('User must be logged in');

    try {
      const resumeRef = doc(db, 'resumes', resumeId);
      const resumeDoc = await getDoc(resumeRef);
      
      if (!resumeDoc.exists()) {
        throw new Error('Resume not found');
      }

      const currentResumeData = resumeDoc.data();
      const newVersion = (currentResumeData.version || 1) + 1;

      // Add to version history
      const versions = currentResumeData.versions || [];
      versions.push({
        version: newVersion,
        data: resumeData,
        createdAt: new Date().toISOString(),
        changes
      });

      // Keep only last 20 versions
      const trimmedVersions = versions.slice(-20);

      await updateDoc(resumeRef, {
        data: resumeData,
        version: newVersion,
        versions: trimmedVersions,
        updatedAt: serverTimestamp()
      });

      await loadResumes();
      if (currentResume?.id === resumeId) {
        await loadResume(resumeId);
      }
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  };

  // Delete resume
  const deleteResume = async (resumeId) => {
    if (!currentUser) throw new Error('User must be logged in');

    try {
      await deleteDoc(doc(db, 'resumes', resumeId));
      await loadResumes();
      if (currentResume?.id === resumeId) {
        setCurrentResume(null);
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  };

  // Get version history
  const getVersionHistory = async (resumeId) => {
    try {
      const resumeDoc = await getDoc(doc(db, 'resumes', resumeId));
      if (resumeDoc.exists()) {
        return resumeDoc.data().versions || [];
      }
      return [];
    } catch (error) {
      console.error('Error loading version history:', error);
      return [];
    }
  };

  // Restore from version
  const restoreVersion = async (resumeId, versionNumber) => {
    try {
      const resumeDoc = await getDoc(doc(db, 'resumes', resumeId));
      if (resumeDoc.exists()) {
        const versions = resumeDoc.data().versions || [];
        const version = versions.find(v => v.version === versionNumber);
        if (version) {
          await updateResume(resumeId, version.data, `Restored from version ${versionNumber}`);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error restoring version:', error);
      return false;
    }
  };

  // Toggle public sharing
  const togglePublicSharing = async (resumeId, isPublic) => {
    if (!currentUser) throw new Error('User must be logged in');

    try {
      await updateDoc(doc(db, 'resumes', resumeId), {
        isPublic,
        updatedAt: serverTimestamp()
      });
      await loadResumes();
      if (currentResume?.id === resumeId) {
        await loadResume(resumeId);
      }
    } catch (error) {
      console.error('Error updating sharing:', error);
      throw error;
    }
  };

  // Load resumes when user changes
  useEffect(() => {
    loadResumes();
  }, [loadResumes]);

  const value = {
    resumes,
    currentResume,
    loading,
    loadResumes,
    loadResume,
    createResume,
    updateResume,
    deleteResume,
    getVersionHistory,
    restoreVersion,
    togglePublicSharing,
    setCurrentResume
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

