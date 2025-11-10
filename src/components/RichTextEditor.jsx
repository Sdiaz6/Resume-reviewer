import React, { useRef, useEffect } from "react";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const isInitializedRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const updateTimeoutRef = useRef(null);
  const wasFocusedRef = useRef(false);

  // Keep onChange ref updated
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Initialize ONLY ONCE on mount
  useEffect(() => {
    if (!editorRef.current || isInitializedRef.current) return;
    isInitializedRef.current = true;
    const initialValue = value || "";
    if (initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Maintain focus if it was focused before
  useEffect(() => {
    if (wasFocusedRef.current && editorRef.current) {
      // Restore focus after any render
      requestAnimationFrame(() => {
        if (editorRef.current && !editorRef.current.contains(document.activeElement)) {
          editorRef.current.focus();
          // Restore cursor to end
          const range = document.createRange();
          const selection = window.getSelection();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      });
    }
  });

  // Handle input - NEVER touch DOM, just read and notify parent
  const handleInput = () => {
    if (!editorRef.current || !isInitializedRef.current) return;
    
    // Mark as focused
    wasFocusedRef.current = true;
    
    // Clear any pending update
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // Debounce onChange to reduce parent re-renders
    updateTimeoutRef.current = setTimeout(() => {
      if (!editorRef.current || !isInitializedRef.current) return;
      
      // Read content fresh at callback time
      const freshContent = editorRef.current.innerHTML;
      
      if (onChangeRef.current) {
        onChangeRef.current(freshContent);
      }
    }, 600);
  };

  // Formatting buttons
  const applyFormat = (command, val = null) => {
    if (!editorRef.current) return;
    
    wasFocusedRef.current = true;
    editorRef.current.focus();
    
    // Save cursor
    const selection = window.getSelection();
    let savedRange = null;
    if (selection.rangeCount > 0 && editorRef.current.contains(selection.anchorNode)) {
      try {
        savedRange = selection.getRangeAt(0).cloneRange();
      } catch {
        // Ignore
      }
    }
    
    document.execCommand(command, false, val);
    
    // Restore cursor immediately
    if (savedRange) {
      requestAnimationFrame(() => {
        if (editorRef.current) {
          try {
            const newSelection = window.getSelection();
            newSelection.removeAllRanges();
            newSelection.addRange(savedRange);
          } catch {
            // Ignore
          }
        }
      });
    }
    
    const newContent = editorRef.current.innerHTML;
    if (onChangeRef.current) {
      onChangeRef.current(newContent);
    }
  };

  // Handle focus
  const handleFocus = () => {
    wasFocusedRef.current = true;
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Handle blur
  const handleBlur = () => {
    wasFocusedRef.current = false;
    
    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
      updateTimeoutRef.current = null;
    }
    
    // Small delay before syncing
    setTimeout(() => {
      if (!editorRef.current) return;
      
      const currentContent = editorRef.current.innerHTML;
      const externalValue = value || "";
      
      // Only sync if different
      if (currentContent !== externalValue) {
        editorRef.current.innerHTML = externalValue;
      }
    }, 50);
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const toolbarButtons = [
    { command: "bold", label: "B", title: "Bold" },
    { command: "italic", label: "I", title: "Italic" },
    { command: "underline", label: "U", title: "Underline" },
    { separator: true },
    { command: "insertUnorderedList", label: "•", title: "Bullet List" },
    { command: "insertOrderedList", label: "1.", title: "Numbered List" },
    { separator: true },
    { command: "indent", label: "→", title: "Indent" },
    { command: "outdent", label: "←", title: "Outdent" },
  ];

  return (
    <div style={{
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      background: "rgba(255, 255, 255, 0.05)",
      overflow: "hidden"
    }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        gap: "8px",
        padding: "10px",
        background: "rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        flexWrap: "wrap"
      }}>
        {toolbarButtons.map((btn, i) => (
          btn.separator ? (
            <div key={i} style={{ width: "1px", background: "rgba(255, 255, 255, 0.2)", margin: "0 4px" }} />
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => applyFormat(btn.command)}
              title={btn.title}
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                minWidth: "32px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255, 255, 255, 0.1)"}
              onMouseLeave={(e) => e.target.style.background = "transparent"}
            >
              {btn.label}
            </button>
          )
        ))}
      </div>
      {/* Editor - Completely uncontrolled, React NEVER touches this */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        suppressContentEditableWarning={true}
        style={{
          minHeight: "150px",
          padding: "15px",
          color: "#ffffff",
          fontSize: "16px",
          lineHeight: "1.6",
          outline: "none",
          fontFamily: "'Inter', sans-serif",
          caretColor: "#ffffff",
          minWidth: "1px",
          display: "block",
          whiteSpace: "pre-wrap",
          wordWrap: "break-word"
        }}
        data-placeholder={placeholder}
      />
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
        [contenteditable] {
          caret-color: #ffffff !important;
          -webkit-user-select: text !important;
          user-select: text !important;
        }
        [contenteditable]:focus {
          outline: none !important;
          caret-color: #ffffff !important;
        }
        [contenteditable]:focus::selection {
          background: rgba(102, 126, 234, 0.3);
        }
      `}</style>
    </div>
  );
};

// NEVER re-render - component is fully uncontrolled
export default React.memo(RichTextEditor, () => true);
