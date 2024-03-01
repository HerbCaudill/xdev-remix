import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../app/ui/Button"
import React from "react"

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
    controls: { expanded: false, exclude: ["children", "className"] },
  },
  argTypes: {
    children: { control: false },
    intent: {
      control: { options: ["neutral", "primary", "danger"], type: "inline-radio" },
    },
    size: { options: ["xs", "sm", "md", "lg"], control: { type: "inline-radio" } },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="min-h-[4em]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {
  args: {
    children: "Click me",
    intent: "neutral",
  },
}

export const Primary: Story = {
  args: {
    children: "Continue",
    intent: "primary",
  },
}

export const Danger: Story = {
  args: {
    children: "Delete",
    intent: "danger",
  },
}

export const ExtraSmall: Story = {
  args: {
    children: "Click me",
    size: "xs",
  },
}

export const Small: Story = {
  args: {
    children: "Click me",
    size: "sm",
  },
}

export const Medium: Story = {
  args: {
    children: "Click me",
    size: "md",
  },
}

export const Large: Story = {
  args: {
    children: "Click me",
    size: "lg",
  },
}
