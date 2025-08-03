"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Volume2, Maximize, ArrowLeft, Users, Eye } from "lucide-react"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export default function WatchPage() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("room_id") || "Unknown"

  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState([75])

  const handleGoBack = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button onClick={handleGoBack} variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <Eye className="w-3 h-3 text-white" />
              </div>
              <h1 className="text-lg font-semibold">
                Watching <span className="text-red-400">{roomId}</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>1,234 viewers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="max-w-6xl mx-auto p-4">
        <Card className="relative overflow-hidden bg-slate-900 border-slate-800">
          <div className="aspect-video bg-slate-800 flex items-center justify-center relative group">
            {/* Video Placeholder */}
            <div className="text-center">
              <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center text-4xl font-bold text-slate-400 mb-6">
                <Play className="w-16 h-16" />
              </div>
              <p className="text-xl font-medium text-slate-300">Live Stream</p>
              <p className="text-slate-500">Room: {roomId}</p>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Progress Bar */}
                <div className="mb-4">
                  <Slider
                    defaultValue={[0]}
                    max={100}
                    step={1}
                    className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-red-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-red-500"
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-white" />
                      <Slider
                        value={volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-20 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
                      />
                    </div>

                    <span className="text-sm text-white/80">LIVE</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white"
                    >
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        </Card>

        {/* Stream Info */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Live Stream - Room {roomId}</h2>
              <p className="text-slate-400 mt-1">Broadcasting live video content</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">1,234</div>
              <div className="text-sm text-slate-500">viewers</div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Connected</span>
            </div>
            <div>Quality: 1080p</div>
            <div>Latency: ~2s</div>
          </div>
        </div>
      </div>
    </div>
  )
}
