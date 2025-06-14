// PWA App using React - Pesticide Assistant UI
// Features:
// - Upload Excel file
// - Natural language query input
// - Display matching products from indexed Excel

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PesticideAssistant() {
  const [query, setQuery] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [results, setResults] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const allData = [];
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        allData.push(...sheet.map((row) => ({ ...row, sheetName })));
      });
      setExcelData(allData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSearch = () => {
    const keyword = query.toLowerCase();
    const matches = excelData.filter((row) =>
      Object.values(row).some(
        (val) => typeof val === 'string' && val.toLowerCase().includes(keyword)
      )
    );
    setResults(matches);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🌾 Pesticide Assistant</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />
      <Input
        placeholder="Ask a question like 'best herbicide for paddy'"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2"
      />
      <Button onClick={handleSearch} className="mb-4">
        Search
      </Button>
      <div className="space-y-4">
        {results.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <pre className="text-xs whitespace-pre-wrap">
                {Object.entries(item)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join('\n')}
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

