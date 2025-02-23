import { getLocale } from "#hooks/getLocale"
import { JSX } from "preact/jsx-runtime"
import { navigate } from "vike/client/router"
import { Chevron } from "#design-system/Icons"
import { useEffect, useState } from "preact/hooks"
import { RefObject } from "preact"

export default function Button(props: {
  type: "primary" | "secondary" | "text"
  rounded?: boolean
  link?: string
  children: Element | string | JSX.Element
  icon?: JSX.Element
  chevron?: boolean
  class?: string
  small?: boolean
  ref?: RefObject<HTMLButtonElement>
  disabled?: boolean
  function?: (e?: MouseEvent) => void
}) {
  return (
    <button
      disabled={props.disabled}
      onClick={() => {
        props.link &&
          (props.link.includes("mailto") || props.link.includes("imessage")
            ? window.open(props.link)
            : props.link.includes("http")
            ? window.open(getLocale() + props.link)
            : navigate(getLocale() + props.link))
        props.function && props.function()
      }}
      class={
        "flex items-center gap-1 outline-transparent focus:outline-2 focus:outline-blue-50 disabled:cursor-not-allowed " +
        (props.small ? "text-sm px-3 py-1.5 " : " ") +
        props.class +
        " " +
        (props.type !== "text"
          ? "font-medium rounded-md transition-all duration-200 px-4 py-2 " +
            (props.type === "primary"
              ? "text-white bg-neutral-900 hover:bg-neutral-800 dark:text-black dark:bg-white dark:hover:bg-neutral-200 "
              : "border text-black border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-800 dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-900 dark:hover:text-neutral-200 dark:border-neutral-800")
          : "text-neutral-800 hover:underline underline-offset-2 font-medium rounded-md px-1.5 dark:text-neutral-200 " +
            (props.chevron ? "pr-0" : "") +
            (props.link?.includes("http") ||
            props.link?.includes("mailto") ||
            props.link?.includes("imessage")
              ? "cursor-alias"
              : ""))
      }
      style={{
        borderRadius: props.rounded ? 1000 : "",
      }}
    >
      {props.icon}
      {props.children}
      {props.chevron && (
        <Chevron
          class="flex-shrink-0"
          size={14}
          stroke={props.type === "text" ? 1.5 : 2}
        />
      )}
    </button>
  )
}

export function ButtonWrapper(props: {
  children: JSX.ElementChildrenAttribute | JSX.Element[]
}) {
  return <div class="flex gap-4 flex-wrap">{props.children}</div>
}

export function InlineLink(props: {
  link: string | undefined
  children: any
  class?: string
  hideWeight?: boolean
  inlineImageUrl?: string
}) {
  return (
    <a
      class={
        "text-black px-0 transition-colors dark:text-white hover:underline underline-offset-2 " +
        (props.link?.includes("http") ? "cursor-alias " : "") +
        (props.class ? props.class : "") +
        (props.hideWeight ? "" : " font-medium")
      }
      href={props.link}
      target={props.link && props.link.includes("http") ? "_blank" : "_self"}
    >
      {props.inlineImageUrl && (
        <img
          class="w-6 aspect-square ml-1 rounded-sm inline-block mx-1 -translate-y-0.5"
          src={props.inlineImageUrl}
        />
      )}
      {props.children}
    </a>
  )
}
