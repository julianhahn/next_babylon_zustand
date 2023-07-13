## NeBaZu - Next Babylon Zustand Starter

### Install and run

just as your typicall next application run:

- yarn install
- yarn dev

### The gist of it:

After some fiddeling with Babylon and general Page Layout we found a version that works for us.
The Babylon Scene is `position: absolute` and spans the whole screen with `z-index: 1`.
The JSX Canvas is also `position: absolute` ans spans the whole screen with `z-index: 2`.

    ** But does this not block the canvas? **

Yes, and no. We decided, that we simply set the on the JSX Canvas `pointer-events: none`, and therefore all mouse events fall through to babylon.
With this you can even have text displaying over a babylon scene and the scene is still reactive.

    ** How can I interact with the JSX Elements then? **

Children do inherit the `pointer-events: none` property but can overwrite them seperatly. If you want a piece of UI on top of babylon that is interactive and blocks babylon just
give it the `pointer-event: auto`.
This enables us to have UI Elements on top of babylon, without the need to make our app components with position absolute to give them a z-index. They can stay relative.

The Debug Layer of Babylon has simply a `z-index 3` and therefore displays on top of everything else.
