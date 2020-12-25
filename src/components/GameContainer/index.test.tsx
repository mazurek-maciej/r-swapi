import { screen, waitFor } from "@testing-library/react"
import { renderWithRedux } from "../../services/renderWithRedux"
import GameContainer from "."
import { configureStore } from "../../store";
import userEvent from "@testing-library/user-event";

const store = configureStore();

describe('Game container', () => {
  it('should render roll button', () => {
    renderWithRedux(<GameContainer />)
    const rollBtn = 'ROLL'
    
    expect(screen.getByText(rollBtn)).toBeInTheDocument()
  })

  it('should not render draw text when there is no draw', () => {
    renderWithRedux(<GameContainer />)
    
    expect(screen.queryByText('DRAW')).toBeNull();
  })

  it('should render message with information to start the game', () => {
    renderWithRedux(<GameContainer />)
    const message = screen.getByText('To start the game press roll button');

    expect(message).toBeInTheDocument();
  })

  it('should not render message with information to start the game after click roll button', async () => {
    renderWithRedux(<GameContainer />)
    const rollButton = screen.getByText('ROLL').parentElement!

    userEvent.click(rollButton)
    const message = screen.queryByText('To start the game press roll button');

    await waitFor(() => expect(message).toBeNull());
  })

  it('should render cards of two players at the beginning', () => {
    renderWithRedux(<GameContainer />)
    const leftPlayer = screen.getByText('Dathomirian');
    const rightPlayer = screen.getByText('Wookie');

    expect(leftPlayer).toBeInTheDocument();
    expect(rightPlayer).toBeInTheDocument();
  })

  it('should render players with score equal to 0', () => {
    renderWithRedux(<GameContainer />);
    const scoreLabels = screen.queryAllByText('Score: 0');

    expect(scoreLabels).toHaveLength(2)
  })

  it('should render draw label when isDraw is true', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        isDraw: true
      }
    })
    renderWithRedux(<GameContainer />, { store: mockStore });
    const drawText = screen.getByText('DRAW')

    expect(drawText).toBeInTheDocument()
  })

  it('should render error message if there is any for current game type', () => {
    const error = 'We had some trouble to connect with space galactic. Roll again'
    const mockStore = configureStore({
      ...store.getState(),
      peopleCards: {
        ...store.getState().peopleCards,
        error
      }
    })
    renderWithRedux(<GameContainer />, { store: mockStore });

    expect(screen.getByText(error)).toBeInTheDocument()
  })

  it('should render two progress circles after click roll button', async () => {
    renderWithRedux(<GameContainer />);
    const rollButton = screen.getByText('ROLL').parentElement!

    userEvent.click(rollButton)

    await waitFor(() => expect(screen.getAllByRole('progressbar')).toHaveLength(2))
  })
  
})