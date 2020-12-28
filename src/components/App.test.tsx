import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithRedux } from '../services/renderWithRedux';
import { configureStore } from '../store';

import App from './App';

const store = configureStore();

describe('App container', () => {
  it('should render correctly', () => {
    renderWithRedux(<App />);
  });

  it('should render header elements', () => {
    renderWithRedux(<App />);

    const appTitle = screen.queryByText(/gwizdek/i);
    const appInfo = screen.queryByText(/choose cards type/i);

    expect(appTitle).toBeInTheDocument();
    expect(appInfo).toBeInTheDocument();
  });

  it('should render cards selection on initial run', () => {
    renderWithRedux(<App />);

    const peopleCardsSelection = screen.queryByText(/people/i);
    const starshipsCardsSelection = screen.queryByText(/starships/i);
    const rollPeopleBtn = screen.queryByText(/roll people/i);
    const rollStarshipsBtn = screen.queryByText(/roll starships/i);

    expect(peopleCardsSelection).toBeInTheDocument();
    expect(starshipsCardsSelection).toBeInTheDocument();
    expect(rollPeopleBtn).toBeNull();
    expect(rollStarshipsBtn).toBeNull();
  });

  it('should render switch cards button when user selected game type', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        userSelectedGameType: true,
      },
    });
    renderWithRedux(<App />, { store: mockStore });
    const switchGameBtn = screen.queryByText(/switch cards/i);

    expect(switchGameBtn).toBeInTheDocument();
  });

  it('should render both player cards when user selected game type', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        userSelectedGameType: true,
      },
    });
    renderWithRedux(<App />, { store: mockStore });

    const leftPlayerName = store.getState().game.leftPlayer.name;
    const rightPlayerName = store.getState().game.rightPlayer.name;
    const leftPlayer = screen.queryByText(leftPlayerName);
    const rightPlayer = screen.queryByText(rightPlayerName);
    const scoreLabels = screen.queryAllByText(/score: 0/i);

    expect(leftPlayer).toBeInTheDocument();
    expect(rightPlayer).toBeInTheDocument();
    expect(scoreLabels).toHaveLength(2);
  });

  it('should render initial info to start the game', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        userSelectedGameType: true,
      },
    });
    renderWithRedux(<App />, { store: mockStore });

    const info = screen.queryByText('To start the game press roll button');

    expect(info).toBeInTheDocument();
  });

  it('should render cards with initial information about no content', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        userSelectedGameType: true,
      },
    });
    renderWithRedux(<App />, { store: mockStore });

    const noContentInfo = screen.queryAllByText(
      'Cannot recieve information from space command',
    );

    expect(noContentInfo).toHaveLength(2);
  });

  it('should render roll button base on selected game type', () => {
    const mockStore = configureStore({
      ...store.getState(),
      game: {
        ...store.getState().game,
        userSelectedGameType: true,
      },
    });
    renderWithRedux(<App />, { store: mockStore });

    const selectedGameType = mockStore.getState().game.gameType;
    const rollBtn = screen.queryByText(`ROLL ${selectedGameType}`);

    expect(rollBtn).toBeInTheDocument();
  });
});
