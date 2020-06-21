import {css} from 'lit-element';

export const getSeaStyle = (path) => {
  return `
  
  
.synoptic {
  width: 100%;
  border-collapse: collapse;
}

table.synoptic tr:not(:last-child) {
  border-bottom: 1px solid #476b6b;
  // background-color: cadetblue;
}
  
table.synoptic td {
  vertical-align: top;
}
  
.msw-sw
{
    display:            inline-block;
    width:              30px;
    height:             30px;
    background:         url("${path}/we-sprite.png") no-repeat top left;
}
.msw-sw-1{ background-position: 0 0; width: 30px; height: 30px; } 
.msw-sw-10{ background-position: 0 -60px; width: 30px; height: 30px; } 
.msw-sw-11{ background-position: 0 -120px; width: 30px; height: 30px; } 
.msw-sw-12{ background-position: 0 -180px; width: 30px; height: 30px; } 
.msw-sw-13{ background-position: 0 -240px; width: 30px; height: 30px; } 
.msw-sw-14{ background-position: 0 -300px; width: 30px; height: 30px; } 
.msw-sw-15{ background-position: 0 -360px; width: 30px; height: 30px; } 
.msw-sw-16{ background-position: 0 -420px; width: 30px; height: 30px; } 
.msw-sw-17{ background-position: 0 -480px; width: 30px; height: 30px; } 
.msw-sw-18{ background-position: 0 -540px; width: 30px; height: 30px; } 
.msw-sw-19{ background-position: 0 -600px; width: 30px; height: 30px; } 
.msw-sw-2{ background-position: 0 -660px; width: 30px; height: 30px; } 
.msw-sw-20{ background-position: 0 -720px; width: 30px; height: 30px; } 
.msw-sw-21{ background-position: 0 -780px; width: 30px; height: 30px; } 
.msw-sw-22{ background-position: 0 -840px; width: 30px; height: 30px; } 
.msw-sw-23{ background-position: 0 -900px; width: 30px; height: 30px; } 
.msw-sw-24{ background-position: 0 -960px; width: 30px; height: 30px; } 
.msw-sw-25{ background-position: 0 -1020px; width: 30px; height: 30px; } 
.msw-sw-26{ background-position: 0 -1080px; width: 30px; height: 30px; } 
.msw-sw-27{ background-position: 0 -1140px; width: 30px; height: 30px; } 
.msw-sw-28{ background-position: 0 -1200px; width: 30px; height: 30px; } 
.msw-sw-29{ background-position: 0 -1260px; width: 30px; height: 30px; } 
.msw-sw-3{ background-position: 0 -1320px; width: 30px; height: 30px; } 
.msw-sw-30{ background-position: 0 -1380px; width: 30px; height: 30px; } 
.msw-sw-31{ background-position: 0 -1440px; width: 30px; height: 30px; } 
.msw-sw-32{ background-position: 0 -1500px; width: 30px; height: 30px; } 
.msw-sw-33{ background-position: 0 -1560px; width: 30px; height: 30px; } 
.msw-sw-34{ background-position: 0 -1620px; width: 30px; height: 30px; } 
.msw-sw-35{ background-position: 0 -1680px; width: 30px; height: 30px; } 
.msw-sw-36{ background-position: 0 -1740px; width: 30px; height: 30px; } 
.msw-sw-37{ background-position: 0 -1800px; width: 30px; height: 30px; } 
.msw-sw-38{ background-position: 0 -1860px; width: 30px; height: 30px; } 
.msw-sw-4{ background-position: 0 -1920px; width: 30px; height: 30px; } 
.msw-sw-5{ background-position: -60px 0; width: 30px; height: 30px; } 
.msw-sw-6{ background-position: -60px -60px; width: 30px; height: 30px; } 
.msw-sw-7{ background-position: -60px -120px; width: 30px; height: 30px; } 
.msw-sw-8{ background-position: -60px -180px; width: 30px; height: 30px; } 
.msw-sw-9{ background-position: -60px -240px; width: 30px; height: 30px; }

.msw-swa /* Inherits from swell arrows */
{
    background:         url("${path}/sa-sprite.png") no-repeat top left;
}
.msw-swa-10{ background-position: 0 0; width: 26px; height: 26px; } 
.msw-swa-100{ background-position: 0 -52px; width: 26px; height: 26px; } 
.msw-swa-105{ background-position: 0 -104px; width: 26px; height: 26px; } 
.msw-swa-110{ background-position: 0 -156px; width: 26px; height: 26px; } 
.msw-swa-115{ background-position: 0 -208px; width: 26px; height: 26px; } 
.msw-swa-120{ background-position: 0 -260px; width: 26px; height: 26px; } 
.msw-swa-125{ background-position: 0 -312px; width: 26px; height: 26px; } 
.msw-swa-130{ background-position: 0 -364px; width: 26px; height: 26px; } 
.msw-swa-135{ background-position: 0 -416px; width: 26px; height: 26px; } 
.msw-swa-140{ background-position: 0 -468px; width: 26px; height: 26px; } 
.msw-swa-145{ background-position: 0 -520px; width: 26px; height: 26px; } 
.msw-swa-15{ background-position: 0 -572px; width: 26px; height: 26px; } 
.msw-swa-150{ background-position: 0 -624px; width: 26px; height: 26px; } 
.msw-swa-155{ background-position: 0 -676px; width: 26px; height: 26px; } 
.msw-swa-160{ background-position: 0 -728px; width: 26px; height: 26px; } 
.msw-swa-165{ background-position: 0 -780px; width: 26px; height: 26px; } 
.msw-swa-170{ background-position: 0 -832px; width: 26px; height: 26px; } 
.msw-swa-175{ background-position: 0 -884px; width: 26px; height: 26px; } 
.msw-swa-180{ background-position: 0 -936px; width: 26px; height: 26px; } 
.msw-swa-185{ background-position: 0 -988px; width: 26px; height: 26px; } 
.msw-swa-190{ background-position: 0 -1040px; width: 26px; height: 26px; } 
.msw-swa-195{ background-position: 0 -1092px; width: 26px; height: 26px; } 
.msw-swa-20{ background-position: 0 -1144px; width: 26px; height: 26px; } 
.msw-swa-200{ background-position: 0 -1196px; width: 26px; height: 26px; } 
.msw-swa-205{ background-position: 0 -1248px; width: 26px; height: 26px; } 
.msw-swa-210{ background-position: 0 -1300px; width: 26px; height: 26px; } 
.msw-swa-215{ background-position: 0 -1352px; width: 26px; height: 26px; } 
.msw-swa-220{ background-position: 0 -1404px; width: 26px; height: 26px; } 
.msw-swa-225{ background-position: 0 -1456px; width: 26px; height: 26px; } 
.msw-swa-230{ background-position: 0 -1508px; width: 26px; height: 26px; } 
.msw-swa-235{ background-position: 0 -1560px; width: 26px; height: 26px; } 
.msw-swa-240{ background-position: 0 -1612px; width: 26px; height: 26px; } 
.msw-swa-245{ background-position: 0 -1664px; width: 26px; height: 26px; } 
.msw-swa-25{ background-position: 0 -1716px; width: 26px; height: 26px; } 
.msw-swa-250{ background-position: 0 -1768px; width: 26px; height: 26px; } 
.msw-swa-255{ background-position: 0 -1820px; width: 26px; height: 26px; } 
.msw-swa-260{ background-position: 0 -1872px; width: 26px; height: 26px; } 
.msw-swa-265{ background-position: 0 -1924px; width: 26px; height: 26px; } 
.msw-swa-270{ background-position: -52px 0; width: 26px; height: 26px; } 
.msw-swa-275{ background-position: -52px -52px; width: 26px; height: 26px; } 
.msw-swa-280{ background-position: -52px -104px; width: 26px; height: 26px; } 
.msw-swa-285{ background-position: -52px -156px; width: 26px; height: 26px; } 
.msw-swa-290{ background-position: -52px -208px; width: 26px; height: 26px; } 
.msw-swa-295{ background-position: -52px -260px; width: 26px; height: 26px; } 
.msw-swa-30{ background-position: -52px -312px; width: 26px; height: 26px; } 
.msw-swa-300{ background-position: -52px -364px; width: 26px; height: 26px; } 
.msw-swa-305{ background-position: -52px -416px; width: 26px; height: 26px; } 
.msw-swa-310{ background-position: -52px -468px; width: 26px; height: 26px; } 
.msw-swa-315{ background-position: -52px -520px; width: 26px; height: 26px; } 
.msw-swa-320{ background-position: -52px -572px; width: 26px; height: 26px; } 
.msw-swa-325{ background-position: -52px -624px; width: 26px; height: 26px; } 
.msw-swa-330{ background-position: -52px -676px; width: 26px; height: 26px; } 
.msw-swa-335{ background-position: -52px -728px; width: 26px; height: 26px; } 
.msw-swa-340{ background-position: -52px -780px; width: 26px; height: 26px; } 
.msw-swa-345{ background-position: -52px -832px; width: 26px; height: 26px; } 
.msw-swa-35{ background-position: -52px -884px; width: 26px; height: 26px; } 
.msw-swa-350{ background-position: -52px -936px; width: 26px; height: 26px; } 
.msw-swa-355{ background-position: -52px -988px; width: 26px; height: 26px; } 
.msw-swa-360{ background-position: -52px -1040px; width: 26px; height: 26px; } 
.msw-swa-40{ background-position: -52px -1092px; width: 26px; height: 26px; } 
.msw-swa-45{ background-position: -52px -1144px; width: 26px; height: 26px; } 
.msw-swa-5{ background-position: -52px -1196px; width: 26px; height: 26px; } 
.msw-swa-50{ background-position: -52px -1248px; width: 26px; height: 26px; } 
.msw-swa-55{ background-position: -52px -1300px; width: 26px; height: 26px; } 
.msw-swa-60{ background-position: -52px -1352px; width: 26px; height: 26px; } 
.msw-swa-65{ background-position: -52px -1404px; width: 26px; height: 26px; } 
.msw-swa-70{ background-position: -52px -1456px; width: 26px; height: 26px; } 
.msw-swa-75{ background-position: -52px -1508px; width: 26px; height: 26px; } 
.msw-swa-80{ background-position: -52px -1560px; width: 26px; height: 26px; } 
.msw-swa-85{ background-position: -52px -1612px; width: 26px; height: 26px; } 
.msw-swa-90{ background-position: -52px -1664px; width: 26px; height: 26px; } 
.msw-swa-95{ background-position: -52px -1716px; width: 26px; height: 26px; }

.msw-ssa,
.msw-swa /* Wind arrows */
{
    display:            inline-block;
    width:              26px;
    height:             26px;
    background:         url("${path}/wa-sprite.png") no-repeat top left;
}
.msw-ssa-10{ background-position: 0 0; width: 26px; height: 26px; } 
.msw-ssa-100{ background-position: 0 -52px; width: 26px; height: 26px; } 
.msw-ssa-105{ background-position: 0 -104px; width: 26px; height: 26px; } 
.msw-ssa-110{ background-position: 0 -156px; width: 26px; height: 26px; } 
.msw-ssa-115{ background-position: 0 -208px; width: 26px; height: 26px; } 
.msw-ssa-120{ background-position: 0 -260px; width: 26px; height: 26px; } 
.msw-ssa-125{ background-position: 0 -312px; width: 26px; height: 26px; } 
.msw-ssa-130{ background-position: 0 -364px; width: 26px; height: 26px; } 
.msw-ssa-135{ background-position: 0 -416px; width: 26px; height: 26px; } 
.msw-ssa-140{ background-position: 0 -468px; width: 26px; height: 26px; } 
.msw-ssa-145{ background-position: 0 -520px; width: 26px; height: 26px; } 
.msw-ssa-15{ background-position: 0 -572px; width: 26px; height: 26px; } 
.msw-ssa-150{ background-position: 0 -624px; width: 26px; height: 26px; } 
.msw-ssa-155{ background-position: 0 -676px; width: 26px; height: 26px; } 
.msw-ssa-160{ background-position: 0 -728px; width: 26px; height: 26px; } 
.msw-ssa-165{ background-position: 0 -780px; width: 26px; height: 26px; } 
.msw-ssa-170{ background-position: 0 -832px; width: 26px; height: 26px; } 
.msw-ssa-175{ background-position: 0 -884px; width: 26px; height: 26px; } 
.msw-ssa-180{ background-position: 0 -936px; width: 26px; height: 26px; } 
.msw-ssa-185{ background-position: 0 -988px; width: 26px; height: 26px; } 
.msw-ssa-190{ background-position: 0 -1040px; width: 26px; height: 26px; } 
.msw-ssa-195{ background-position: 0 -1092px; width: 26px; height: 26px; } 
.msw-ssa-20{ background-position: 0 -1144px; width: 26px; height: 26px; } 
.msw-ssa-200{ background-position: 0 -1196px; width: 26px; height: 26px; } 
.msw-ssa-205{ background-position: 0 -1248px; width: 26px; height: 26px; } 
.msw-ssa-210{ background-position: 0 -1300px; width: 26px; height: 26px; } 
.msw-ssa-215{ background-position: 0 -1352px; width: 26px; height: 26px; } 
.msw-ssa-220{ background-position: 0 -1404px; width: 26px; height: 26px; } 
.msw-ssa-225{ background-position: 0 -1456px; width: 26px; height: 26px; } 
.msw-ssa-230{ background-position: 0 -1508px; width: 26px; height: 26px; } 
.msw-ssa-235{ background-position: 0 -1560px; width: 26px; height: 26px; } 
.msw-ssa-240{ background-position: 0 -1612px; width: 26px; height: 26px; } 
.msw-ssa-245{ background-position: 0 -1664px; width: 26px; height: 26px; } 
.msw-ssa-25{ background-position: 0 -1716px; width: 26px; height: 26px; } 
.msw-ssa-250{ background-position: 0 -1768px; width: 26px; height: 26px; } 
.msw-ssa-255{ background-position: 0 -1820px; width: 26px; height: 26px; } 
.msw-ssa-260{ background-position: 0 -1872px; width: 26px; height: 26px; } 
.msw-ssa-265{ background-position: 0 -1924px; width: 26px; height: 26px; } 
.msw-ssa-270{ background-position: -52px 0; width: 26px; height: 26px; } 
.msw-ssa-275{ background-position: -52px -52px; width: 26px; height: 26px; } 
.msw-ssa-280{ background-position: -52px -104px; width: 26px; height: 26px; } 
.msw-ssa-285{ background-position: -52px -156px; width: 26px; height: 26px; } 
.msw-ssa-290{ background-position: -52px -208px; width: 26px; height: 26px; } 
.msw-ssa-295{ background-position: -52px -260px; width: 26px; height: 26px; } 
.msw-ssa-30{ background-position: -52px -312px; width: 26px; height: 26px; } 
.msw-ssa-300{ background-position: -52px -364px; width: 26px; height: 26px; } 
.msw-ssa-305{ background-position: -52px -416px; width: 26px; height: 26px; } 
.msw-ssa-310{ background-position: -52px -468px; width: 26px; height: 26px; } 
.msw-ssa-315{ background-position: -52px -520px; width: 26px; height: 26px; } 
.msw-ssa-320{ background-position: -52px -572px; width: 26px; height: 26px; } 
.msw-ssa-325{ background-position: -52px -624px; width: 26px; height: 26px; } 
.msw-ssa-330{ background-position: -52px -676px; width: 26px; height: 26px; } 
.msw-ssa-335{ background-position: -52px -728px; width: 26px; height: 26px; } 
.msw-ssa-340{ background-position: -52px -780px; width: 26px; height: 26px; } 
.msw-ssa-345{ background-position: -52px -832px; width: 26px; height: 26px; } 
.msw-ssa-35{ background-position: -52px -884px; width: 26px; height: 26px; } 
.msw-ssa-350{ background-position: -52px -936px; width: 26px; height: 26px; } 
.msw-ssa-355{ background-position: -52px -988px; width: 26px; height: 26px; } 
.msw-ssa-40{ background-position: -52px -1040px; width: 26px; height: 26px; } 
.msw-ssa-45{ background-position: -52px -1092px; width: 26px; height: 26px; } 
.msw-ssa-5{ background-position: -52px -1144px; width: 26px; height: 26px; } 
.msw-ssa-50{ background-position: -52px -1196px; width: 26px; height: 26px; } 
.msw-ssa-55{ background-position: -52px -1248px; width: 26px; height: 26px; } 
.msw-ssa-60{ background-position: -52px -1300px; width: 26px; height: 26px; } 
.msw-ssa-65{ background-position: -52px -1352px; width: 26px; height: 26px; } 
.msw-ssa-70{ background-position: -52px -1404px; width: 26px; height: 26px; } 
.msw-ssa-75{ background-position: -52px -1456px; width: 26px; height: 26px; } 
.msw-ssa-80{ background-position: -52px -1508px; width: 26px; height: 26px; } 
.msw-ssa-85{ background-position: -52px -1560px; width: 26px; height: 26px; } 
.msw-ssa-90{ background-position: -52px -1612px; width: 26px; height: 26px; } 
.msw-ssa-95{ background-position: -52px -1664px; width: 26px; height: 26px; }

.list-group-content {
    display: inline-block;
    vertical-align: middle;
}

.inline-block {
    display: inline-block;
    *display: inline;
    zoom: 1;
}

.svg {
    display: none
}

.svg-icon-container {
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px
}

.svg {
    display: none!important
}

.svg-icon {
    display: inline-block;
    vertical-align: middle
}



.svg-wind-icon {
    width: 20px;
    height: 27px;
    background-size: auto 100%;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjguODc0cHgiIGhlaWdodD0iMTkuOTAxcHgiIHZpZXdCb3g9IjAgMCAyOC44NzQgMTkuOTAxIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyOC44NzQgMTkuOTAxIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNNy42MTYgOS43NTVjMCAwIDAuMjA3LTIuMjI3IDAuNjQ1LTQuNjY3QzguNDY4IDMuOSA5IDAgOSAwSDYuNTkxSDQuMTQ4YzAgMCAwLjYgMy45IDAuOCA1LjEgQzUuMzYgNy41IDUuNiA5LjggNS42IDkuNzU1TDAgNy40MzlsNi41OTEgMTIuMzM0bDYuNTkxLTEyLjMzNEw3LjYxNiA5Ljc1NXoiLz48cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjMuMTg4IDkuNzU1YzAgMCAwLjIwNy0yLjIyNyAwLjY0NS00LjY2N0MyNC4wNCAzLjkgMjQuNiAwIDI0LjYgMGgtMi40NDNoLTIuNDQzIGMwIDAgMC42IDMuOSAwLjggNS4wODhjMC40MzggMi40IDAuNiA0LjcgMC42IDQuNjY3bC01LjU2Ny0yLjMxNmw2LjU5MSAxMi4zMzRsNi41OTEtMTIuMzM0TDIzLjE4OCA5Ljc1NXoiLz48L3N2Zz4=")
}

.svg-wind-icon.svg-icon-white {
    background-position: 100% 0
}

.svg-wind-icon.svg-icon-sm {
    width: 13px;
    height: 20px
}

.svg-wind-icon-dark {
    width: 27px;
    height: 27px;
    background-size: 100%;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDMwIDMwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAzMCAzMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGcgaWQ9IkxheWVyXzIiPjxjaXJjbGUgZmlsbD0ibm9uZSIgY3g9IjE1IiBjeT0iMTUiIHI9IjE1Ii8+PC9nPjxnIGlkPSJMYXllcl8xIj48cGF0aCBmaWxsPSIjMUExQTFBIiBkPSJNMTYuNTU0LDE1LjA0MWMwLDAsMC4zMDktMy4zMjUsMC45NjMtNi45NjhjMC4zMDktMS43MTUsMS4xNTQtNy41OTcsMS4xNTQtNy41OTdoLTMuNjQ3aC0zLjY0NmMwLDAsMC44NDYsNS44ODIsMS4xNTQsNy41OTdjMC42NTQsMy42NDMsMC45NjMsNi45NjgsMC45NjMsNi45NjhsLTguMzEyLTMuNDU3TDE1LjAyMywzMGw5Ljg0Mi0xOC40MTZMMTYuNTU0LDE1LjA0MXoiLz48L2c+PC9zdmc+")
}

.svg-wind-icon-danger {
    width: 27px;
    height: 27px;
    background-position: top;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwIDMwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6bm9uZTt9LnN0MXtmaWxsOiNFNzRDM0M7fTwvc3R5bGU+PGcgaWQ9IkxheWVyXzIiPjxjaXJjbGUgY2xhc3M9InN0MCIgY3g9IjE1IiBjeT0iMTUiIHI9IjE1Ii8+PC9nPjxnIGlkPSJMYXllcl8xXzFfIj48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTYuNiwxNWMwLDAsMC4zLTMuMywxLTdjMC4zLTEuNywxLjItNy42LDEuMi03LjZIMTVoLTMuNmMwLDAsMC44LDUuOSwxLjIsNy42YzAuNywzLjYsMSw3LDEsN2wtOC4zLTMuNUwxNSwzMGw5LjgtMTguNEwxNi42LDE1eiIvPjwvZz48L3N2Zz4=)
}

.svg-wind-icon-gray {
    width: 27px;
    height: 27px;
    background-position: top;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNC41IDcuMSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNC41IDcuMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiM1NTU1NTU7fTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTQuNCwzSDNWMEgxLjZ2M0gwLjJDMCwzLDAsMy4yLDAsMy4zTDIuMSw3YzAuMSwwLjEsMC4zLDAuMSwwLjMsMGwyLjEtMy42QzQuNiwzLjIsNC41LDMsNC40LDN6Ii8+PC9zdmc+)
}

.svg-wind-icon-light {
    width: 30px;
    height: 30px;
    background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjgzLjUgMjgzLjUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI4My41IDI4My41OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6I0ZGRkZGRjt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTU1LjMsMTQyLjFjMCwwLDIuMi0yMy43LDYuOS00OS42YzIuMi0xMi4yLDguMi01NC4xLDguMi01NC4xaC0yNmgtMjZjMCwwLDYsNDEuOSw4LjIsNTQuMWM0LjcsMjUuOSw2LjksNDkuNiw2LjksNDkuNmwtNTkuMi0yNC42bDcwLjEsMTMxLjJsNzAuMS0xMzEuMkwxNTUuMywxNDIuMXoiLz48L3N2Zz4=)
}

// ----
.svg-swell-icon {
    width: 21px;
    height: 21px
}
.svg-swell-icon {
    text-indent: -9999px
}

.svg-swell-icon,.svg .svg-wind-icon {
    background-repeat: no-repeat;
    background-position: 0 0;
    display: inline-block;
    text-align: center
}

.svg-swell-icon {
    width: 17px;
    height: 23px;
    background-size: auto 100%;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDMuOTU4cHgiIGhlaWdodD0iMTkuOTAxcHgiIHZpZXdCb3g9IjAgMCA0My45NTggMTkuOTAxIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA0My45NTggMTkuOTAxIiB4bWw6c3BhY2U9InByZXNlcnZlIj48c3R5bGU+LnN0eWxlMHtmaWxsOgkjRkZGRkZGO30uc3R5bGUxe2ZpbGw6CSMzQ0JCRTg7fTwvc3R5bGU+PHBvbHlnb24gcG9pbnRzPSI2LjIsMTkuOSAxMi40LDAuNCA2LjIsNCAwLDAuNCIvPjxwb2x5Z29uIHBvaW50cz0iMjIsMTkuOSAyOC4yLDAuNCAyMiw0IDE1LjgsMC40IiBjbGFzcz0ic3R5bGUwIi8+PHBvbHlnb24gcG9pbnRzPSIzNy44LDE5LjkgNDQsMC40IDM3LjgsNCAzMS42LDAuNCIgY2xhc3M9InN0eWxlMSIvPjwvc3ZnPg==")
}

.svg-swell-icon.svg-icon-white {
    background-position: 60% 0
}

.svg-swell-icon-dark {
    width: 23px;
    height: 23px;
    background-size: 100%;
    background-position: 0 0;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnIGlkPSJMYXllcl8yIj48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iMCIgY3g9IjI0Ljk5IiBjeT0iMjQuOTQ2IiByPSIyNC45NDYiLz48L2c+PGcgaWQ9IkxheWVyXzFfMV8iPjxwb2x5Z29uIGZpbGw9IiMxQTFBMUEiIHBvaW50cz0iMzkuOTYxLDUuMDA4IDI0Ljk2OSw0OS44OTMgMTAuMDM3LDUuMDA4IDI1LjAzOCwxMS4yNDIgIi8+PC9nPjwvc3ZnPg==")
}
` ;
} ;


