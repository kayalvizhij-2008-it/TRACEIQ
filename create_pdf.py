import os

pdf_content = """%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj

2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj

3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 5 0 R
>>
endobj

4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj

5 0 obj
<<
  /Length 550
>>
stream
BT
/F1 20 Tf
50 730 Td
(TRACEIQ SYNTHETIC EVIDENCE PACKAGE) Tj
/F1 12 Tf
0 -30 Td
(CASE ID: CASE-ACPIA-2048) Tj
0 -20 Td
(FOR DEMONSTRATION ONLY - SYNTHETIC DATA) Tj
0 -30 Td
(SYNTHETIC EVIDENCE RECORD E063) Tj
0 -20 Td
(Target Account: ACCOUNT-X17) Tj
0 -20 Td
(Bound Device: DEVICE-D04) Tj
0 -20 Td
(Coordinates: LOCATION-L08 Kochi Cyber Corridor) Tj
0 -20 Td
(Timestamped Event: EVENT-T14 2024-01-15 11:20 IST) Tj
0 -20 Td
(Correlation Confidence: 89% High Correlation) Tj
0 -30 Td
(NOTICE: AI RECOMMENDS. EVIDENCE SUPPORTS. HUMANS DECIDE.) Tj
ET
endstream
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000262 00000 n 
0000000333 00000 n 

trailer
<<
  /Size 6
  /Root 1 0 R
>>
startxref
935
%%EOF
"""

os.makedirs("public", exist_ok=True)
with open("public/TRACEIQ_SYNTHETIC_EVIDENCE_PACKAGE.pdf", "w", encoding="utf-8") as f:
    f.write(pdf_content)

print("Created public/TRACEIQ_SYNTHETIC_EVIDENCE_PACKAGE.pdf successfully")
