## About

This is a simple app that allows you to crop an image and display it in a profile picture in react / next.js

## Demo

visit: https://react-easy-crop-sample.vercel.app/
watch: ![crop demo](/public/crop-demo.gif)

## How to use

This repo is designed to be used as a component in your own project with shadcn/ui, react-easy-crop and Jimp.

- shadcn/ui: https://ui.shadcn.com/
- react-easy-crop: https://github.com/ricardo-ch/react-easy-crop
- Jimp: https://github.com/oliver-moran/jimp

Please follow the steps below to use this component in your project:

1. Run `npm install jimp react-easy-crop`
2. Install shadcn/ui in your project and add necessary components, avatar, button, dialog, input, label, slider. (See https://ui.shadcn.com/docs/installation/next)
3. Copy the `components/image-cropper.tsx` file to your project
4. Wrap any component that triggers an image cropper with the `ImageCropper` component
5. Pass the `cropFallback` function to the `ImageCropper` component. This function handles the cropped image. It receives the cropped image as a base64-encoded string and should define how the cropped image is processed or stored.

## Example

In page.tsx, button component is wrapped with `ImageCropper` component.

```
<ImageCropper cropFallback={cropFallback}>
  <Button variant="outline" asChild>
    <p>
      <EditIcon />
      Edit icon
    </p>
  </Button>
</ImageCropper>
```

parameters:

- `children`: The React nodes that will trigger the `ImageCropper` when interacted with. Typically, this would be a button or an icon that, when clicked, opens the cropping dialog.
- `title`: The title displayed at the top of the cropping dialog. Defaults to `"Crop Image"` if not provided.
- `cancelNode`: The content of the cancel button within the cropping dialog. Defaults to a "Cancel" button.
- `cropNode`: The content of the crop button within the cropping dialog. Defaults to a "Crop" button with a crop icon.
- `cropShape`: Determines the shape of the cropping area. Can be either `"rect"` for rectangular crops or `"round"` for circular crops. Defaults to `"round"`.
- `showGrid`: A boolean that specifies whether grid lines should be displayed within the cropping area. Useful for guiding precise cropping. Defaults to `false`.
- `cropFallback`: A function that handles the cropped image. It receives the cropped image as a base64-encoded string and should define how the cropped image is processed or stored.

For more info, please refer to the original repo: https://github.com/ricardo-ch/react-easy-crop
