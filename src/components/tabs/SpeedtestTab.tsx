import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SpeedtestResult } from "@/types/hotel";
import { Zap, Download, Upload, Timer, Wifi, Play, RotateCcw } from "lucide-react";

interface SpeedtestTabProps {
  onSpeedtestComplete: (results: SpeedtestResult) => void;
  lastResults?: SpeedtestResult | null;
}

export const SpeedtestTab = ({ onSpeedtestComplete, lastResults }: SpeedtestTabProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState<'download' | 'upload' | 'ping' | null>(null);
  const [results, setResults] = useState<SpeedtestResult | null>(lastResults || null);

  const runSpeedtest = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    // Simulate ping test
    setCurrentTest('ping');
    for (let i = 0; i <= 20; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Simulate download test
    setCurrentTest('download');
    for (let i = 21; i <= 60; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate upload test
    setCurrentTest('upload');
    for (let i = 61; i <= 100; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 80));
    }

    // Generate mock results
    const mockResults: SpeedtestResult = {
      downloadSpeed: Math.floor(Math.random() * 80) + 20, // 20-100 Mbps
      uploadSpeed: Math.floor(Math.random() * 30) + 5,    // 5-35 Mbps
      ping: Math.floor(Math.random() * 50) + 10,          // 10-60 ms
      timestamp: new Date(),
    };

    setResults(mockResults);
    setIsRunning(false);
    setCurrentTest(null);
    setProgress(0);
    
    onSpeedtestComplete(mockResults);
  };

  const getSpeedQuality = (downloadSpeed: number) => {
    if (downloadSpeed >= 50) return { label: "Ausgezeichnet", color: "text-success" };
    if (downloadSpeed >= 25) return { label: "Gut", color: "text-primary" };
    if (downloadSpeed >= 10) return { label: "Okay", color: "text-warning" };
    return { label: "Schlecht", color: "text-destructive" };
  };

  const getCurrentTestLabel = () => {
    switch (currentTest) {
      case 'ping': return 'Latenz messen...';
      case 'download': return 'Download-Geschwindigkeit...';
      case 'upload': return 'Upload-Geschwindigkeit...';
      default: return 'Speedtest läuft...';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold mb-2">WLAN Speedtest</h1>
        <p className="text-muted-foreground">
          Messen Sie die Geschwindigkeit Ihrer aktuellen WLAN-Verbindung
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Speedtest Button */}
          <Card className="p-6 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-primary" />
              </div>
              
              {isRunning ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">{getCurrentTestLabel()}</h3>
                  <Progress value={progress} className="mb-4" />
                  <p className="text-sm text-muted-foreground">{progress}% abgeschlossen</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {results ? "Speedtest erneut starten" : "Speedtest starten"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Testen Sie Ihre aktuelle WLAN-Geschwindigkeit
                  </p>
                  <Button 
                    onClick={runSpeedtest} 
                    disabled={isRunning}
                    size="lg"
                    className="w-full"
                  >
                    {results ? <RotateCcw className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {results ? "Erneut testen" : "Test starten"}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Results */}
          {results && !isRunning && (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Testergebnisse</h4>
                  <div className="text-xs text-muted-foreground">
                    {results.timestamp.toLocaleString()}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Download Speed */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Download className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">Download</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{results.downloadSpeed} Mbps</div>
                      <div className={`text-xs ${getSpeedQuality(results.downloadSpeed).color}`}>
                        {getSpeedQuality(results.downloadSpeed).label}
                      </div>
                    </div>
                  </div>

                  {/* Upload Speed */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Upload className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">Upload</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{results.uploadSpeed} Mbps</div>
                    </div>
                  </div>

                  {/* Ping */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Timer className="w-4 h-4 text-primary mr-2" />
                      <span className="text-sm">Ping</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{results.ping} ms</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Tip */}
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-start">
                  <Wifi className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-primary mb-1">Tipp</p>
                    <p className="text-muted-foreground">
                      Diese Messwerte werden automatisch in Ihre nächste Hotelbewertung übernommen.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};