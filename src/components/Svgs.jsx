import React from 'react'
import Svg, { Circle, ClipPath, Defs, G, Mask, Path, Rect } from 'react-native-svg'
import { normalize } from "../utils/normalize";

export function Apple(){
   return(
        <Svg
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50px"
        height="50px">
        {/*<Path d="M 33.375 0 C 30.539063 0.191406 27.503906 1.878906 25.625 4.15625*/}
        {/*C 23.980469 6.160156 22.601563 9.101563 23.125 12.15625 C 22.65625 12.011719*/}
        {/* 22.230469 11.996094 21.71875 11.8125 C 20.324219 11.316406 18.730469 10.78125*/}
        {/*  16.75 10.78125 C 12.816406 10.78125 8.789063 13.121094 6.25 17.03125 C 2.554688*/}
        {/*   22.710938 3.296875 32.707031 8.90625 41.25 C 9.894531 42.75 11.046875 44.386719*/}
        {/*   12.46875 45.6875 C 13.890625 46.988281 15.609375 47.980469 17.625 48 C 19.347656*/}
        {/*   48.019531 20.546875 47.445313 21.625 46.96875 C 22.703125 46.492188 23.707031*/}
        {/*   46.070313 25.59375 46.0625 C 25.605469 46.0625 25.613281 46.0625 25.625 46.0625 C*/}
        {/*   27.503906 46.046875 28.476563 46.460938 29.53125 46.9375 C 30.585938 47.414063 31.*/}
        {/*   773438 48.015625 33.5 48 C 35.554688 47.984375 37.300781 46.859375 38.75 45.46875 C*/}
        {/*   40.199219 44.078125 41.390625 42.371094 42.375 40.875 C 43.785156 38.726563 44.351563*/}
        {/*   37.554688 45.4375 35.15625 C 45.550781 34.90625 45.554688 34.617188 45.445313 34.363281*/}
        {/*   C 45.339844 34.109375 45.132813 33.910156 44.875 33.8125 C 41.320313 32.46875 39.292969*/}
        {/*   29.324219 39 26 C 38.707031 22.675781 40.113281 19.253906 43.65625 17.3125 C 43.917969*/}
        {/*   317.171875 44.101563 16.925781 44.164063 16.636719 C 44.222656 16.347656 44.152344 16.042969*/}
        {/*    43.96875 15.8125 C 41.425781 12.652344 37.847656 10.78125 34.34375 10.78125 C 32.109375*/}
        {/*    10.78125 30.46875 11.308594 29.125 11.8125 C 28.902344 11.898438 28.738281 11.890625 28.53125*/}
        {/*    11.96875 C 29.894531 11.25 31.097656 10.253906 32 9.09375 C 33.640625 6.988281 34.90625 3.992188*/}
        {/*    34.4375 0.84375 C 34.359375 0.328125 33.894531 -0.0390625 33.375 0 Z M 32.3125 2.375 C 32.246094*/}
        {/*    4.394531 31.554688 6.371094 30.40625 7.84375 C 29.203125 9.390625 27.179688 10.460938 25.21875 10.*/}
        {/*    78125 C 25.253906 8.839844 26.019531 6.828125 27.1875 5.40625 C 28.414063 3.921875 30.445313 2.851563*/}
        {/*    32.3125 2.375 Z M 16.75 12.78125 C 18.363281 12.78125 19.65625 13.199219 21.03125 13.6875 C 22.40625*/}
        {/*    14.175781 23.855469 14.75 25.5625 14.75 C 27.230469 14.75 28.550781 14.171875 29.84375 13.6875 C 31.136719*/}
        {/*    13.203125 32.425781 12.78125 34.34375 12.78125 C 36.847656 12.78125 39.554688 14.082031 41.6875 16.34375*/}
        {/*    C 38.273438 18.753906 36.675781 22.511719 37 26.15625 C 37.324219 29.839844 39.542969 33.335938 43.1875*/}
        {/*    35.15625 C 42.398438 36.875 41.878906 38.011719 40.71875 39.78125 C 39.761719 41.238281 38.625 42.832031*/}
        {/*    37.375 44.03125 C 36.125 45.230469 34.800781 45.988281 33.46875 46 C 32.183594 46.011719 31.453125*/}
        {/*    45.628906 30.34375 45.125 C 29.234375 44.621094 27.800781 44.042969 25.59375 44.0625 C 23.390625 44.074219*/}
        {/*    21.9375 44.628906 20.8125 45.125 C 19.6875 45.621094 18.949219 46.011719 17.65625 46 C 16.289063 45.988281*/}
        {/*    15.019531 45.324219 13.8125 44.21875 C 12.605469 43.113281 11.515625 41.605469 10.5625 40.15625 C 5.3125*/}
        {/*    32.15625 4.890625 22.757813 7.90625 18.125 C 10.117188 14.722656 13.628906 12.78125 16.75 12.78125 Z"/>*/}
    </Svg>
   )
}

export function NamazIcon() {
    return (
        <Svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3.92506 0.00169922C3.93639 0.00124609 3.94755 0 3.95899 0H21.3666C22.8388 0 24.0366 1.19772 24.0366 2.66998V23.8833H26.8277C27.2969 23.8833 27.6773 24.2637 27.6773 24.7329V26.3301C27.6773 27.7796 26.5159 28.9623 25.0749 28.9983C25.0636 28.9988 25.0524 29 25.041 29H7.63332C6.16112 29 4.96334 27.8023 4.96334 26.33V5.11674H2.17226C1.70305 5.11674 1.32265 4.73635 1.32265 4.26713V2.66998C1.32265 1.22038 2.48401 0.0377793 3.92506 0.00169922ZM25.0074 27.3008C25.5426 27.3008 25.9781 26.8654 25.9781 26.3301V25.5825H25.9781H10.3166V26.3301C10.3166 26.6725 10.2511 26.9997 10.1331 27.3008H25.0074ZM6.66256 26.33C6.66256 26.8653 7.09801 27.3008 7.63332 27.3008H7.64663C8.18189 27.3008 8.6174 26.8653 8.6174 26.33V24.7328C8.6174 24.2636 8.9978 23.8832 9.46701 23.8832H22.3375V2.66998C22.3375 2.13473 21.902 1.69922 21.3667 1.69922H6.4791C6.59708 2.00032 6.66256 2.32753 6.66256 2.66998V26.33ZM3.02181 3.41753H3.02187H4.96334V2.66998C4.96334 2.13473 4.52789 1.69922 3.99258 1.69922C3.45727 1.69922 3.02181 2.13467 3.02181 2.66998V3.41753Z" fill="#344181"/>
            <Path d="M9.46696 5.54558H19.9531C20.4223 5.54558 20.8027 5.92598 20.8027 6.39519C20.8027 6.8644 20.4223 7.2448 19.9531 7.2448H9.46696C8.99775 7.2448 8.61735 6.8644 8.61735 6.39519C8.61735 5.92598 8.99775 5.54558 9.46696 5.54558Z" fill="#344181"/>
            <Path d="M9.46696 9.81587H19.9531C20.4223 9.81587 20.8027 10.1963 20.8027 10.6655C20.8027 11.1347 20.4223 11.5151 19.9531 11.5151H9.46696C8.99775 11.5151 8.61735 11.1347 8.61735 10.6655C8.61735 10.1963 8.99775 9.81587 9.46696 9.81587Z" fill="#344181"/>
            <Path d="M9.46696 14.0862H19.9531C20.4223 14.0862 20.8027 14.4666 20.8027 14.9359C20.8027 15.4051 20.4223 15.7855 19.9531 15.7855H9.46696C8.99775 15.7855 8.61735 15.4051 8.61735 14.9359C8.61735 14.4666 8.99775 14.0862 9.46696 14.0862Z" fill="#344181"/>
            <Path d="M9.46696 18.3566H19.9531C20.4223 18.3566 20.8027 18.737 20.8027 19.2062C20.8027 19.6754 20.4223 20.0558 19.9531 20.0558H9.46696C8.99775 20.0558 8.61735 19.6754 8.61735 19.2062C8.61735 18.737 8.99775 18.3566 9.46696 18.3566Z" fill="#344181"/>
        </Svg>

    )
}