import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

/**
 * Export resume as PDF
 */
export const exportToPDF = async (resumeElement, filename = 'resume.pdf') => {
  try {
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

/**
 * Export resume as Word document
 */
export const exportToWord = async (resumeData, filename = 'resume.docx') => {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          // Header
          new Paragraph({
            text: resumeData.personalInfo?.fullName || 'Resume',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${resumeData.personalInfo?.email || ''} | ${resumeData.personalInfo?.phone || ''}`,
                break: 1
              })
            ],
            alignment: AlignmentType.CENTER
          }),

          // Summary
          ...(resumeData.personalInfo?.summary ? [
            new Paragraph({
              text: 'Professional Summary',
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(resumeData.personalInfo.summary.replace(/<[^>]*>/g, ''))
          ] : []),

          // Experience
          ...(resumeData.experience?.length > 0 ? [
            new Paragraph({
              text: 'Experience',
              heading: HeadingLevel.HEADING_2
            }),
            ...resumeData.experience.flatMap(exp => [
              new Paragraph({
                text: `${exp.jobTitle || ''} at ${exp.company || ''}`,
                heading: HeadingLevel.HEADING_3
              }),
              new Paragraph({
                text: `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''} | ${exp.location || ''}`
              }),
              ...(exp.responsibilities || []).map(resp => 
                new Paragraph({
                  text: `• ${resp}`,
                  bullet: { level: 0 }
                })
              )
            ])
          ] : []),

          // Education
          ...(resumeData.education?.length > 0 ? [
            new Paragraph({
              text: 'Education',
              heading: HeadingLevel.HEADING_2
            }),
            ...resumeData.education.flatMap(edu => [
              new Paragraph({
                text: `${edu.degree || ''} - ${edu.institution || ''}`,
                heading: HeadingLevel.HEADING_3
              }),
              new Paragraph({
                text: `${edu.graduationDate || ''} | ${edu.location || ''}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`
              })
            ])
          ] : []),

          // Skills
          ...(resumeData.skills ? [
            new Paragraph({
              text: 'Skills',
              heading: HeadingLevel.HEADING_2
            }),
            ...(resumeData.skills.technical || []).map(skill =>
              new Paragraph({
                text: `• ${skill}`,
                bullet: { level: 0 }
              })
            )
          ] : [])
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Word:', error);
    throw error;
  }
};

/**
 * Export resume as plain text
 */
export const exportToText = (resumeData, filename = 'resume.txt') => {
  try {
    let text = '';
    
    // Header
    text += `${resumeData.personalInfo?.fullName || 'Resume'}\n`;
    text += `${resumeData.personalInfo?.email || ''} | ${resumeData.personalInfo?.phone || ''}\n\n`;
    
    // Summary
    if (resumeData.personalInfo?.summary) {
      text += 'PROFESSIONAL SUMMARY\n';
      text += `${resumeData.personalInfo.summary.replace(/<[^>]*>/g, '')}\n\n`;
    }
    
    // Experience
    if (resumeData.experience?.length > 0) {
      text += 'EXPERIENCE\n';
      resumeData.experience.forEach(exp => {
        text += `${exp.jobTitle || ''} at ${exp.company || ''}\n`;
        text += `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''} | ${exp.location || ''}\n`;
        (exp.responsibilities || []).forEach(resp => {
          text += `• ${resp}\n`;
        });
        text += '\n';
      });
    }
    
    // Education
    if (resumeData.education?.length > 0) {
      text += 'EDUCATION\n';
      resumeData.education.forEach(edu => {
        text += `${edu.degree || ''} - ${edu.institution || ''}\n`;
        text += `${edu.graduationDate || ''} | ${edu.location || ''}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}\n\n`;
      });
    }
    
    // Skills
    if (resumeData.skills?.technical?.length > 0) {
      text += 'SKILLS\n';
      resumeData.skills.technical.forEach(skill => {
        text += `• ${skill}\n`;
      });
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting to text:', error);
    throw error;
  }
};

