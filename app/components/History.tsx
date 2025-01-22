import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HistoryItem {
  id: number;
  prompt: string;
  generated_code: string;
  image_path: string | null;
  created_at: string;
}

interface HistoryProps {
  token: string;
  onItemClick: (item: HistoryItem) => void;
}

export function History({ token, onItemClick }: HistoryProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/code-generation/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
          console.error('Failed to fetch history');
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [token]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Histórico de Gerações</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {history.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => onItemClick(item)}
            >
              <p className="font-semibold">{item.prompt}</p>
              <p className="text-sm text-gray-500">{new Date(item.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

