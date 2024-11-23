"use client"
import ImageCropper from "@/components/image-cropper"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { EditIcon } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const cropFallback = async (blob: string) => {
    setCroppedImage(blob)
  }
  return (
    <>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Profile Picture
        </p>
        <Separator />
        <div className="flex items-center justify-start gap-5">
          <Avatar className="size-24">
            <AvatarImage
              src={croppedImage || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ImageCropper cropFallback={cropFallback}>
            <Button variant="outline" asChild>
              <p>
                <EditIcon />
                Edit icon
              </p>
            </Button>
          </ImageCropper>
        </div>
      </div>
    </>
  )
}
