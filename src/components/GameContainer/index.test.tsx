import { screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../../helpers/renderWithRedux';
import GameContainer from '.';
import { configureStore } from '../../store';
import userEvent from '@testing-library/user-event';
import { StatusOfAPICall } from '../../store/game/models/StatusOfApiCall';
import { GameType } from '../../store/models/GameType';

const store = configureStore();

describe('Game container', () => {
  it('should render correctly', () => {
    renderWithRedux(<GameContainer />);
  });

  it('should render roll button', () => {
    renderWithRedux(<GameContainer />);
    const gameType = store.getState().game.gameType;
    const rollBtn = screen.getByText(`ROLL ${gameType}`);

    expect(rollBtn).toBeInTheDocument();
  });

  it('should not render draw text when there is no draw', () => {
    renderWithRedux(<GameContainer />);

    expect(screen.queryByText('DRAW')).toBeNull();
  });

  it('should render message with information to start the game', () => {
    renderWithRedux(<GameContainer />);
    const message = screen.getByText('To start the game press roll button');

    expect(message).toBeInTheDocument();
  });

  it('should not render message with information to start the game after click roll button', async () => {
    renderWithRedux(<GameContainer />);
    const gameType = store.getState().game.gameType;
    const rollButton = screen.getByText(`ROLL ${gameType}`).parentElement!;

    userEvent.click(rollButton);
    const message = screen.queryByText('To start the game press roll button');

    await waitFor(() => expect(message).toBeNull());
  });

  it('should render cards of two players at the beginning', () => {
    renderWithRedux(<GameContainer />);
    const leftPlayer = screen.getByText('Dathomirian');
    const rightPlayer = screen.getByText('Wookie');

    expect(leftPlayer).toBeInTheDocument();
    expect(rightPlayer).toBeInTheDocument();
  });

  it('should render players with score equal to 0', () => {
    renderWithRedux(<GameContainer />);
    const scoreLabels = screen.queryAllByText('Score: 0');

    expect(scoreLabels).toHaveLength(2);
  });

  it('should render draw label when isDraw is true', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        isDraw: true,
      },
    });
    renderWithRedux(<GameContainer />, { store: mockStore });
    const drawText = screen.getByText('DRAW');

    expect(drawText).toBeInTheDocument();
  });

  it('should render error message if there is any for current game type', () => {
    const error = 'We had some trouble to connect with space galactic. Roll again';
    const mockStore = configureStore({
      ...store.getState(),
      peopleCards: {
        ...store.getState().peopleCards,
        error,
      },
    });
    renderWithRedux(<GameContainer />, { store: mockStore });

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('should render three progress circles when data is fetching', async () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        gameType: GameType.people,
      },
      people: {
        status: StatusOfAPICall.FETCHING,
      },
    });

    renderWithRedux(<GameContainer />, { store: mockStore });
    const indicators = screen.queryAllByRole('progressbar');

    expect(indicators).toHaveLength(3);
  });

  it('should render disabled button when data is fetching', () => {
    const mockStore = configureStore({
      ...store.getState(),
      people: {
        ...store.getState().people,
        status: StatusOfAPICall.FETCHING,
      },
    });

    renderWithRedux(<GameContainer />, { store: mockStore });
    const gameType = store.getState().game.gameType;
    const rollBtn = screen.getByText(`ROLL ${gameType}`).parentElement;

    expect(rollBtn).toBeDisabled();
  });
});
