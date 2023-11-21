import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'
import {render, screen, fireEvent, cleanup, getByTestId} from "@testing-library/vue"
import '@testing-library/jest-dom'
import {waitFor} from '@testing-library/dom'
import {flushPromises} from "@vue/test-utils";
import {defineComponent, nextTick} from "vue";

import {createTestingPinia} from '@pinia/testing'
import {fakeGridCardCellSets} from './fakeGridCardProps'

import Weather from '../Weather.vue'
import router from "../../../router"

describe('Testing of vue component', () => {
  const CustomStub = {
    template: '<div>= STUB =</div>',
  }

  beforeEach(async () => {
    vi.mock('../utils/pageHeldlers.ts', () => ({
      fetchInitialWeatherData: vi.fn()
    }))

    render(Weather, {
      global: {
        plugins: [
          router,
          createTestingPinia(),
        ],
        stubs: {
          Settings: CustomStub,
          GridCard: CustomStub,
        },
      },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
  })

  it('Weather.vue render properly', async () => {
    const headerEl = await screen.findByText("Weather")

    expect(headerEl).toHaveTextContent("Weather")
  })


  it('Check the Router.push work out when click "Weather" title on', async () => {
    const routerPush = vi.spyOn(router, 'push')

    await fireEvent.click(screen.getByText('Weather'))

    expect(routerPush).toHaveBeenCalled()
    expect(routerPush).toHaveBeenCalledWith('/about')
  })
})
