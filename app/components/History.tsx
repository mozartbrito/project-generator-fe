import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import config from "@/config";

const apiUrl = config.apiBaseUrl;

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
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload();
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${apiUrl}/code-generation/history`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 403) {
          setError("Unauthorized");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        } else {
            if (response.status === 403) {
                handleLogout();
              } else {
                console.error(`Failed to fetch history. Status: ${response.status}`);
              }
        }
      } catch (error) {
        setError("Error fetching history");
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [token]);

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  if (history.length === 0) {
    return <div className="text-sm text-gray-500">No history items to display</div>;
  }

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

