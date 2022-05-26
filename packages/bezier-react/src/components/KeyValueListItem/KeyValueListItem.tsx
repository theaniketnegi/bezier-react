/* External dependencies */
import React, { forwardRef, Ref } from 'react'

/* Internal dependencies */
import { ItemAction, KeyItem, ValueItem } from './common'
import { TEST_ID_MAP } from './KeyValueListItem.const'
import { KeyValueListItemProps } from './KeyValueListItem.types'
import * as Styled from './KeyValueListItem.styled'

function KeyValueListItem(
  {
    className,
    interpolation,
    valueWrapperInterpolation,
    keyWrapperInterpolation,
    keyIcon,
    keyContent,
    actions,
    testId = TEST_ID_MAP.ROOT,
    children,
    onClickKey,
    onClickValue,
    ...props
  }: KeyValueListItemProps,
  forwardedRef: Ref<HTMLDivElement>,
) {
  return (
    <Styled.Wrapper
      data-testid={testId}
      {...props}
      ref={forwardedRef}
      interpolation={interpolation}
      className={className}
    >
      <Styled.KeyItemContainer onClick={onClickKey}>
        <KeyItem
          keyIcon={keyIcon}
          interpolation={keyWrapperInterpolation}
        >
          { keyContent }
        </KeyItem>
      </Styled.KeyItemContainer>
      <Styled.ValueItemContainer onClick={onClickValue}>
        <ValueItem interpolation={valueWrapperInterpolation}>
          { children }
        </ValueItem>
        <ItemAction actions={actions} />
      </Styled.ValueItemContainer>
    </Styled.Wrapper>
  )
}

export default forwardRef(KeyValueListItem)
