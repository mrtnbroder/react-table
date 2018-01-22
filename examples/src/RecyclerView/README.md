
# Glossary

### Scroller

Scroller is the wrapping element that wraps the viewport area.
It's width and height is needed for layout calculations.

e.g. width=400,height=400

### Viewport

The viewport is the available space the user sees. It's width/height
is based on the amount of items available within the dataSource.

width=400,height=items * 48

|--- Scroller ----------|
|                       |
|  |-- Viewport ----|   |
|  |                |   |
|  |                |   |
|  |________________|   |
|_______________________|
