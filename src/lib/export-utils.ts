import jsPDF from 'jspdf';
import { showToast } from './toast';

/**
 * Triggers a native browser file download to the user's system Downloads folder.
 */
export function triggerBrowserDownload(blob: Blob, filename: string) {
  if (typeof window === 'undefined') return;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * Export tabular data as a clean CSV directly to the user's Downloads folder.
 */
export function exportToCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][]
) {
  try {
    const escapeCell = (val: string | number) => {
      const str = String(val ?? '');
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headerLine = headers.map(escapeCell).join(',');
    const rowLines = rows.map(r => r.map(escapeCell).join(','));
    const csvContent = '\uFEFF' + [headerLine, ...rowLines].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const finalFilename = filename.endsWith('.csv') ? filename : `${filename}.csv`;
    triggerBrowserDownload(blob, finalFilename);
    showToast(`Downloaded ${finalFilename} to your system Downloads folder`, 'success');
  } catch (err) {
    console.error('CSV export failed', err);
    showToast('Failed to export CSV file', 'error');
  }
}

/**
 * Export an official Word Document (.doc) directly to the user's Downloads folder.
 */
export function exportToDocx(
  filename: string,
  title: string,
  subtitle: string,
  sections: Array<{
    heading: string;
    content?: string;
    table?: { headers: string[]; rows: string[][] };
    bulletPoints?: string[];
  }>
) {
  try {
    const finalFilename = filename.endsWith('.doc') || filename.endsWith('.docx') ? filename : `${filename}.doc`;

    let sectionsHtml = '';
    for (const sec of sections) {
      sectionsHtml += `<h3 style="color:#1a2744; margin-top:20px; border-bottom:1px solid #c8d1dc; padding-bottom:4px;">${sec.heading}</h3>`;
      if (sec.content) {
        sectionsHtml += `<p style="font-size:11pt; line-height:1.6; color:#222;">${sec.content.replace(/\n/g, '<br/>')}</p>`;
      }
      if (sec.bulletPoints && sec.bulletPoints.length > 0) {
        sectionsHtml += `<ul style="font-size:11pt; line-height:1.6; color:#222;">`;
        for (const pt of sec.bulletPoints) {
          sectionsHtml += `<li>${pt}</li>`;
        }
        sectionsHtml += `</ul>`;
      }
      if (sec.table) {
        sectionsHtml += `<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse; width:100%; font-size:10pt; margin:12px 0;">`;
        sectionsHtml += `<tr style="background:#f0f4f8; font-weight:bold; color:#1a2744;">`;
        for (const h of sec.table.headers) {
          sectionsHtml += `<th align="left" style="padding:6px 10px;">${h}</th>`;
        }
        sectionsHtml += `</tr>`;
        for (const row of sec.table.rows) {
          sectionsHtml += `<tr>`;
          for (const cell of row) {
            sectionsHtml += `<td style="padding:6px 10px; border-bottom:1px solid #ddd;">${cell}</td>`;
          }
          sectionsHtml += `</tr>`;
        }
        sectionsHtml += `</table>`;
      }
    }

    const htmlDoc = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; margin: 40px; color: #111; }
          .header-box { background: #1a2744; color: #ffffff; padding: 20px; border-radius: 4px; }
          .meta-info { font-size: 9pt; color: #666; margin-top: 10px; margin-bottom: 25px; }
          .footer { font-size: 8pt; color: #888; border-top: 1px solid #eee; margin-top: 40px; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div style="font-size:9pt; letter-spacing:1px; text-transform:uppercase; color:#b5c4d6;">COAL INDIA LIMITED · CMPDI · MINISTRY OF COAL</div>
          <h1 style="margin:6px 0 2px 0; font-size:18pt; color:#ffffff;">${title}</h1>
          <div style="font-size:11pt; color:#d9e2ec;">${subtitle}</div>
        </div>
        <div class="meta-info">
          Generated via <strong>GeoIntel AI</strong> · Classification: <strong>OFFICIAL USE ONLY</strong> · Date: <strong>${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
        </div>
        ${sectionsHtml}
        <div class="footer">
          GeoIntel AI — Enterprise Mining & Geological Intelligence System · Ministry of Coal, Govt. of India
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlDoc], { type: 'application/msword;charset=utf-8' });
    triggerBrowserDownload(blob, finalFilename);
    showToast(`Downloaded ${finalFilename} to your system Downloads folder`, 'success');
  } catch (err) {
    console.error('Word export failed', err);
    showToast('Failed to export Word document', 'error');
  }
}

/**
 * Export an official PDF directly to the user's Downloads folder using jsPDF.
 */
export function exportToPdf(
  filename: string,
  title: string,
  subtitle: string,
  sections: Array<{
    heading: string;
    content?: string;
    table?: { headers: string[]; rows: string[][] };
    bulletPoints?: string[];
  }>
) {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 16;

    // Header banner
    doc.setFillColor(26, 39, 68); // #1a2744
    doc.rect(14, y, pageWidth - 28, 26, 'F');

    doc.setTextColor(181, 196, 214);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text('COAL INDIA LIMITED  ·  CMPDI  ·  MINISTRY OF COAL', 18, y + 6);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(title.slice(0, 50), 18, y + 14);

    doc.setTextColor(220, 230, 242);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text(subtitle.slice(0, 65), 18, y + 20);

    y += 32;

    // Metadata Bar
    doc.setTextColor(100, 110, 125);
    doc.setFontSize(7.5);
    doc.text(
      `Generated by: Dr. Rajiv Kumar (CMPDI Ranchi)  |  Date: ${new Date().toLocaleDateString('en-IN')}  |  Classification: OFFICIAL`,
      14,
      y
    );
    doc.setDrawColor(200, 210, 220);
    doc.line(14, y + 2, pageWidth - 14, y + 2);

    y += 8;

    for (const sec of sections) {
      // Check page break
      if (y > pageHeight - 35) {
        doc.addPage();
        y = 20;
      }

      // Section Heading
      doc.setTextColor(26, 39, 68);
      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'bold');
      doc.text(sec.heading, 14, y);
      y += 5;

      // Section Content
      if (sec.content) {
        doc.setTextColor(50, 50, 50);
        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        const splitText = doc.splitTextToSize(sec.content, pageWidth - 28);
        for (const line of splitText) {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.text(line, 14, y);
          y += 4.5;
        }
        y += 2;
      }

      // Bullet Points
      if (sec.bulletPoints && sec.bulletPoints.length > 0) {
        doc.setFontSize(8.5);
        for (const pt of sec.bulletPoints) {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.setTextColor(181, 101, 29); // Copper bullet
          doc.text('•', 16, y);
          doc.setTextColor(50, 50, 50);
          const splitPt = doc.splitTextToSize(pt, pageWidth - 36);
          doc.text(splitPt, 20, y);
          y += splitPt.length * 4.5;
        }
        y += 2;
      }

      // Tables
      if (sec.table && sec.table.headers.length > 0) {
        const numCols = sec.table.headers.length;
        const colWidth = (pageWidth - 28) / numCols;

        // Table Header
        if (y > pageHeight - 25) {
          doc.addPage();
          y = 20;
        }
        doc.setFillColor(240, 244, 248);
        doc.rect(14, y - 3.5, pageWidth - 28, 6.5, 'F');
        doc.setTextColor(26, 39, 68);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        sec.table.headers.forEach((h, colIdx) => {
          doc.text(String(h).slice(0, 24), 16 + colIdx * colWidth, y);
        });
        y += 5;

        // Table Rows
        doc.setFont('helvetica', 'normal');
        for (const row of sec.table.rows) {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          doc.setTextColor(60, 60, 60);
          doc.setFontSize(7.5);
          row.forEach((cell, colIdx) => {
            doc.text(String(cell).slice(0, 24), 16 + colIdx * colWidth, y);
          });
          doc.setDrawColor(230, 235, 240);
          doc.line(14, y + 1.5, pageWidth - 14, y + 1.5);
          y += 5;
        }
        y += 3;
      }

      y += 3;
    }

    // Add footer on all pages
    const totalPages = doc.getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFontSize(7);
      doc.setTextColor(140, 150, 160);
      doc.text(
        `GeoIntel AI  ·  CMPDI Mining Intelligence Platform  ·  Page ${p} of ${totalPages}`,
        14,
        pageHeight - 8
      );
    }

    const finalFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    doc.save(finalFilename);
    showToast(`Downloaded ${finalFilename} to your system Downloads folder`, 'success');
  } catch (err) {
    console.error('PDF export failed', err);
    showToast('Failed to export PDF file', 'error');
  }
}

/**
 * Export JSON data (e.g. system backup or config) to user's system Downloads folder.
 */
export function exportToJson(filename: string, data: any) {
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const finalFilename = filename.endsWith('.json') ? filename : `${filename}.json`;
    triggerBrowserDownload(blob, finalFilename);
    showToast(`Downloaded ${finalFilename} to your system Downloads folder`, 'success');
  } catch (err) {
    console.error('JSON export failed', err);
    showToast('Failed to export JSON file', 'error');
  }
}
