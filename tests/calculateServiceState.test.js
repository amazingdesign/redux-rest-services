import { SERVICE_INITIAL_STATE, ACTION_INITIAL_STATE } from '../src/options'
import calculateServiceState from '../src/calculateServiceState'

describe('calculates service loading state for', () => {

  it('initial state and one "create" action (happy path)', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE
      }
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual(state)
  })

  it('one "create" action', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE,
        isLoading: true,
      }
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isLoading: true,
      create: state.create,
    })
  })

  it('three different actions', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE,
        isLoading: true,
      },
      find: {
        ...ACTION_INITIAL_STATE,
        isLoading: true,
      },
      update: {
        ...ACTION_INITIAL_STATE,
        isLoading: false,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isLoading: true,
      create: state.create,
      find: state.find,
      update: state.update,
    })
  })

  it('stop loading state when before was loading and one action', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      isLoading: true,
      create: {
        ...ACTION_INITIAL_STATE,
        isLoading: false,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isLoading: false,
      create: state.create,
    })
  })

  it('stop loading state when before was loading and three actions', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      isLoading: true,
      create: {
        ...ACTION_INITIAL_STATE,
        isLoading: false,
      },
      find: {
        ...ACTION_INITIAL_STATE,
        isLoading: false,
      },
      update: {
        ...ACTION_INITIAL_STATE,
        isLoading: false,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isLoading: false,
      create: state.create,
      find: state.find,
      update: state.update,
    })
  })

})

describe('calculates service error state for', () => {

  it('initial state and one "create" action (happy path)', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE
      }
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual(state)
  })

  it('one failed "create" action', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE,
        isError: true,
      }
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isError: true,
      create: state.create,
    })
  })

  it('three different failed actions', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE,
        isError: true,
      },
      find: {
        ...ACTION_INITIAL_STATE,
        isError: true,
      },
      update: {
        ...ACTION_INITIAL_STATE,
        isError: false,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isError: true,
      create: state.create,
      find: state.find,
      update: state.update,
    })
  })

  it('no error state when before was an error in one action', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      isError: true,
      create: {
        ...ACTION_INITIAL_STATE,
        isError: false,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isError: false,
      create: state.create,
    })
  })

  it('no error state when before was an error in three actions', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      isError: true,
      create: {
        ...ACTION_INITIAL_STATE,
        isError: false,
      },
      find: {
        ...ACTION_INITIAL_STATE,
        isError: false,
      },
      update: {
        ...ACTION_INITIAL_STATE,
        isError: false,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isError: false,
      create: state.create,
      find: state.find,
      update: state.update,
    })
  })

  it('some action still have errors and some do not state when before was an error', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      isError: true,
      create: {
        ...ACTION_INITIAL_STATE,
        isError: false,
      },
      find: {
        ...ACTION_INITIAL_STATE,
        isError: false,
      },
      update: {
        ...ACTION_INITIAL_STATE,
        isError: true,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      isError: true,
      create: state.create,
      find: state.find,
      update: state.update,
    })
  })


})

describe('calculates service touched state for', () => {

  it('initial state and one "create" action (happy path)', () => {
    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE
      }
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual(state)
  })

  it('one "create" action', () => {
    const now = Date.now()

    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE,
        touched: now,
      }
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      touched: now,
      create: state.create,
    })
  })

  it('three different actions and initial state', () => {
    const now = Date.now()

    const state = {
      ...SERVICE_INITIAL_STATE,
      create: {
        ...ACTION_INITIAL_STATE,
        touched: now - 100,
      },
      find: {
        ...ACTION_INITIAL_STATE,
        touched: now,
      },
      update: {
        ...ACTION_INITIAL_STATE,
        touched: now + 100,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      touched:  now + 100,
      create: state.create,
      find: state.find,
      update: state.update,
    })
  })

  it('three different actions and different than initial state', () => {
    const now = Date.now()

    const state = {
      ...SERVICE_INITIAL_STATE,
      touched: now,
      create: {
        ...ACTION_INITIAL_STATE,
        touched: now - 100,
      },
      find: {
        ...ACTION_INITIAL_STATE,
        touched: now,
      },
      update: {
        ...ACTION_INITIAL_STATE,
        touched: now + 100,
      },
    }

    const calculatedState = calculateServiceState(state)

    expect(calculatedState).toEqual({
      ...SERVICE_INITIAL_STATE,
      touched:  now + 100,
      create: state.create,
      find: state.find,
      update: state.update,
    })
  })

})