## About

This is a simple app that allows you to crop an image and display it in a profile picture in react / next.js

## Demo

visit: https://image-cropper.vercel.app/
watch: [crop demo](/public/crop-demo.gif)

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

## Example

See the `app/page.tsx` file for an example of how to use the `ImageCropper` component.
