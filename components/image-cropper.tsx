"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Jimp } from "jimp"
import { CropIcon } from "lucide-react"
import { useRef, useState } from "react"
import Cropper, { Area, Point } from "react-easy-crop"

const defaultCancel = <>{"Cancel"}</>
const defaultCrop = (
  <>
    <CropIcon />
    Crop
  </>
)

export default function ImageCropper({
  children,
  title = "Crop Image",
  cancelNode = defaultCancel,
  cropNode = defaultCrop,
  cropShape = "round",
  showGrid = false,
  cropFallback,
}: {
  children: React.ReactNode
  title?: string
  cancelNode?: React.ReactNode
  cropNode?: React.ReactNode
  cropShape?: "rect" | "round"
  showGrid?: boolean
  cropFallback: (croppedBlob: string) => Promise<void>
}) {
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onCropComplete = (croppedArea: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels)
  }

  const handleFileChange = (e?: React.ChangeEvent<HTMLInputElement> | null) => {
    const file = e?.target?.files?.[0]

    if (file) {
      const url = URL.createObjectURL(file)
      setImage(url)
      setIsDialogOpen(true)
    } else {
      setImage(null)
      setIsDialogOpen(false)
    }
  }

  const handleCrop = async () => {
    if (!image || !croppedAreaPixels) return
    setLoading(true)
    const croppedBlob = await getCroppedImg(image, croppedAreaPixels)
    await cropFallback(croppedBlob)
    setImage(null)
    setIsDialogOpen(false)
    URL.revokeObjectURL(image)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    setLoading(false)
  }

  return (
    <>
      <Label htmlFor="icon-image" className="flex hover:cursor-pointer">
        {children}
      </Label>
      <Input
        id="icon-image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={inputRef}
      />
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) {
            handleFileChange()
          }
        }}
      >
        <DialogContent className="h-full flex flex-col">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {image && (
            <div className="relative grow w-full">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape={cropShape}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={showGrid}
                style={{
                  containerStyle: {
                    background: "black",
                  },
                }}
              />
            </div>
          )}
          <div className="mt-4 flex flex-col gap-4">
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
            />
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => handleFileChange()} variant="outline">
                {cancelNode}
              </Button>
              <Button onClick={handleCrop} disabled={loading}>
                {cropNode}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

async function getCroppedImg(
  imageSrc: string,
  cropArea: Area
): Promise<string> {
  const image = await Jimp.read(imageSrc)
  const croppedImage = image.crop({
    x: cropArea.x,
    y: cropArea.y,
    w: cropArea.width,
    h: cropArea.height,
  })
  return await croppedImage.getBase64("image/png")
}
