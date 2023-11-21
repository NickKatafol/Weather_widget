import {render, screen, fireEvent, cleanup, getByTestId} from "@testing-library/vue"
import '@testing-library/jest-dom'
import {waitFor} from '@testing-library/dom'  // но инстиллировать пакет НЕ требуется

import router from "../../../router"
import AboutView from '../AboutView.vue'

describe('Testing the Vue-components', () => {
  let wrapper

  beforeEach(() => {
    wrapper = render(
      AboutView,
      {
        global: {
          plugins: [router],
        },
      }
    )
  })

  afterEach(() => cleanup())


  it('Render Test - AboutView.vue is rendered properly', async () => {
    const headerEl = await screen.findByText("# ABOUT")

    expect(headerEl).toHaveTextContent("ABOUT")
    expect(wrapper).toMatchSnapshot()
  })


  it('Click & Router Test - Check the Router.push work out when cross-button click', async () => {
    //changing the initial value of router.currentRoute._value.path
    //which was '/'
    await router.push('/farAway')
    await fireEvent.click(wrapper.container.querySelector('.header__cross-btn'))

    await waitFor(() => {
        expect(router.currentRoute._value.path).toBe('/')
    })
  })


  it('Click & Router Test - Check the Router.push work out when click "BACK to Home" button on', async () => {
    const routerPush = vi.spyOn(router, 'push')

    await fireEvent.click(screen.getByText('BACK to Home'))

    expect(routerPush).toHaveBeenCalled()
    expect(routerPush).toHaveBeenCalledWith('/')
  })
})
