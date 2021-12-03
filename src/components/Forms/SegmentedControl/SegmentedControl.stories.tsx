/* External dependencies */
import React, { useRef, useState, useCallback } from 'react'
import base from 'paths.macro'
import { range, filter, isEmpty, trim } from 'lodash-es'
import { Story, Meta } from '@storybook/react'

/* Internal dependencies */
import { getTitle } from '../../../utils/storyUtils'
import { styled } from '../../../foundation'
import { Text } from '../../Text'
import { Icon } from '../../Icon'
import SegmentedControl from './SegmentedControl'
import SegmentedControlProps from './SegmentedControl.types'

export default {
  title: getTitle(base),
  component: SegmentedControl,
  argTypes: {
    width: {
      control: {
        type: 'text',
      },
    },
    height: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemList = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 38px;
  padding: 6px 6px 6px 12px;
  background-color: lightpink;

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:not(first-child) {
    margin-top: 4px;
  }

  &:nth-child(even) {
    background-color: skyblue;
  }
`

const InputItem = styled(Item)`
  background-color: lightgrey !important;
`

const CurrentItem = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 30px;
  padding: 0 4px;

  ${props => (props.selected ? `
    &::after {
      display: block;
      content: '👉'
    }
  ` : '')}
`

const ItemText = styled(Text)`
  flex: 1 0 auto;
`

const ItemIcon = styled(Icon)<{ disabled?: boolean }>`
  cursor: ${props => (!props.disabled ? 'pointer' : 'not-allowed')};
`

const Input = styled.input`
  margin: 0 8px 0 0;
  padding: 0;
  flex: 1 0 auto;
  border: none;
  background-color: transparent;

  &:active, &:focus {
    border: none;
    outline: none;
  }
`

const PrimaryStory: Story<SegmentedControlProps> = ({ width, height, selectedOptionIndex, ...otherProps }) => (
  <SegmentedControl
    width={width}
    height={height}
    selectedOptionIndex={selectedOptionIndex}
    {...otherProps}
  >
    { ['Open', 'Snoozed', 'Closed'].map((item) => (
      <Text key={item} bold>{ item }</Text>
    )) }
  </SegmentedControl>
)

const PlaygroundStory: Story<SegmentedControlProps> = ({ width, height, ...otherProps }) => {
  const inputWrapper = useRef<HTMLInputElement>(null)

  const [items, setItems] = useState<any>(range(0, 5) as any[])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const clickRemoveIconHandlerFactory = useCallback((index) => (
    () => {
      if (items.length > 1) {
        setItems(prev => filter(prev, (e, i) => (i !== index)))
        setCurrentIndex(Math.min(items.length - 2, currentIndex))
      }
    }
  ), [
    items,
    currentIndex,
  ])

  const handleClickAddIcon = useCallback(() => {
    if (inputWrapper.current && inputWrapper.current.value) {
      setItems(prev => [...prev, inputWrapper.current!.value])
      inputWrapper.current.value = ''
    }
  }, [])

  const handleDownEnter = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation()
      const value = e.currentTarget.value
      if (!isEmpty(trim(value))) {
        setItems(prev => [...prev, value])
        e.currentTarget.value = ''
      }
    }
  }, [])

  const handleChangeOption = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  return (
    <Wrapper>
      <SegmentedControl
        width={width}
        height={height}
        selectedOptionIndex={currentIndex}
        onChangeOption={handleChangeOption}
        {...otherProps}
      >
        { items.map((n) => (
          <Text key={`span-${n}`} bold>{ n }</Text>
        )) }
      </SegmentedControl>

      <ItemList>
        { items.map((item, index, allItems) => (
          <Item>
            <CurrentItem selected={currentIndex === index} />
            <ItemText>{ item }</ItemText>
            <ItemIcon
              name="cancel"
              color="txt-white-normal"
              disabled={allItems.length === 1}
              onClick={clickRemoveIconHandlerFactory(index)}
            />
          </Item>
        )) }

        <InputItem>
          <Input
            ref={inputWrapper}
            placeholder="Input new value"
            onKeyUp={handleDownEnter}
          />
          <ItemIcon
            name="plus"
            color="txt-white-normal"
            onClick={handleClickAddIcon}
          />
        </InputItem>
      </ItemList>
    </Wrapper>
  )
}

export const Primary = PrimaryStory.bind({})

export const Playground = PlaygroundStory.bind({})

Primary.args = {
  disabled: false,
  width: '400px',
  height: '36px',
  selectedOptionIndex: 0,
}

Playground.args = {
  disabled: false,
  width: '400px',
  height: '36px',
}