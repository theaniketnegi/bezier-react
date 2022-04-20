/* Internal dependencies */
import { SegmentedControlSize } from './SegmentedControl.types'

export const SIZE_TO_HEIGHT: Record<SegmentedControlSize, number> = {
  [SegmentedControlSize.XS]: 22,
  [SegmentedControlSize.S]: 24,
  [SegmentedControlSize.M]: 32,
  [SegmentedControlSize.L]: 36,
}

export const SIZE_TO_PADDING: Record<SegmentedControlSize, number> = {
  [SegmentedControlSize.XS]: 1,
  [SegmentedControlSize.S]: 2,
  [SegmentedControlSize.M]: 2,
  [SegmentedControlSize.L]: 4,
}

export const DIVIDER_WIDTH = 1

export const SIZE_TO_DIVIDER_VERTICAL_MARGIN: Record<SegmentedControlSize, number> = {
  [SegmentedControlSize.XS]: 7,
  [SegmentedControlSize.S]: 8,
  [SegmentedControlSize.M]: 8,
  [SegmentedControlSize.L]: 10,
}
