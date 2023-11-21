import { describe, it, expect } from 'vitest'
import {render} from "@testing-library/vue";

import GridCard from '../GridCard.vue'
import {fakeGridCardCellSets} from "./fakeGridCardProps";

describe('Render component with props', () => {
  it('GridCard is rendering properly', () => {
    const wrapper = render(GridCard, {
      props: {cellSets: fakeGridCardCellSets}
    })

    expect(wrapper).toMatchSnapshot()
  })
})
