"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"

export default function StreamPage() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("room_id") || "Unknown"
  const username = searchParams.get("username") || "User"
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)

  // Mock active speakers data
  const activeSpeakers = [
    { id: 1, name: "Alice", initials: "AL" },
    { id: 2, name: "Bob", initials: "BO" },
    { id: 3, name: "Charlie", initials: "CH" },
    { id: 4, name: "Diana", initials: "DI" },
    { id: 5, name: "Eve", initials: "EV" },
  ]

  const handleLeaveRoom = () => {
    window.location.href = "/"
  }

  const getUserMedia = useCallback(async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    setLocalStream(localStream)
  }, [])
  useEffect(() => {

    getUserMedia()
  }, [])

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      {/* Header - Fixed height */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                Connected to room <span className="text-green-400">{roomId}</span> as{" "}
                <span className="text-green-400">{username}</span>
              </h1>
            </div>
          </div>
          <div className="text-sm text-slate-400">6 participants</div>
        </div>
      </div>

      {/* Main Content - Flexible height */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto p-4 h-full">
          {/* Side-by-side Video Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            {/* Dominant Speaker - Left Side */}
            <div className="lg:col-span-2 flex flex-col min-h-0">
              <h2 className="text-xl font-semibold flex items-center mb-3 flex-shrink-0">
                <Video className="w-5 h-5 mr-2 text-primary" />
                Dominant Speaker
              </h2>
              <Card className="relative overflow-hidden bg-slate-800 border-2 border-primary flex-1 min-h-0">
                <div className="h-full bg-slate-700 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4">
                      {username.substring(0, 2).toUpperCase()}
                    </div>
                    <p className="text-lg font-medium">{username} (You)</p>
                    <p className="text-sm text-slate-400">Speaking</p>
                  </div>
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    LIVE
                  </div>
                </div>
              </Card>
            </div>

            {/* Active Speakers - Right Side */}
            <div className="flex flex-col min-h-0">
              <h2 className="text-xl font-semibold flex items-center mb-3 flex-shrink-0">
                <Users className="w-5 h-5 mr-2 text-slate-400" />
                Active Speakers
              </h2>
              <div className="flex-1 min-h-0 overflow-y-auto space-y-3 pr-2">
                {activeSpeakers.map((speaker) => (
                  <Card
                    key={speaker.id}
                    className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors flex-shrink-0"
                  >
                    <div className="aspect-video bg-slate-700 flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-sm font-bold text-white mb-2">
                          {speaker.initials}
                        </div>
                        <p className="text-sm font-medium">{speaker.name}</p>
                      </div>
                      <div className="absolute top-2 right-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls - Fixed height */}
      <div className="bg-slate-800 border-t border-slate-700 p-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-4">
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <Button
              onClick={() => setMicEnabled(!micEnabled)}
              variant={micEnabled ? "default" : "destructive"}
              size="lg"
              className="w-14 h-14 rounded-full"
            >
              {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <span className={clsx(micEnabled ? "" : "text-slate-400")}>{micEnabled ? "Mic On" : "Mic Off"}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-[10px]">
            <Button
              onClick={() => setCameraEnabled(!cameraEnabled)}
              variant={cameraEnabled ? "default" : "destructive"}
              size="lg"
              className="w-14 h-14 rounded-full"
            >
              {cameraEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <span className={clsx(cameraEnabled ? "" : "text-slate-400")}>{cameraEnabled ? "Camera On" : "Camera Off"}</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-[10px]">
            <Button
              onClick={handleLeaveRoom}
              variant="destructive"
              size="lg"
              className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700"
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
            <span>Connected</span>
          </div>
        </div>


      </div>
    </div>
  )
}
