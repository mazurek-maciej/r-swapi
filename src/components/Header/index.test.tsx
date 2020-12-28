import { render, screen, waitFor } from "@testing-library/react"
import Header from './'
;
import userEvent from "@testing-library/user-event";

describe('Header component', () => {
  const userSelectedGameType = false;
  const handleOnClick = jest.fn();

  it('should render correctly', () => {
    render(<Header userSelectedGameType={userSelectedGameType} handleOnClick={handleOnClick} />)
  })

  it('should render header element', () => {
    render(<Header userSelectedGameType={userSelectedGameType} handleOnClick={handleOnClick} />)
    const title = screen.getByText('gwizdek');
    const selectGameType = screen.getByText('Choose cards type');

    expect(title).toBeInTheDocument();
    expect(selectGameType).toBeInTheDocument();
  })

  it('should call handleOnClick method after click switch card type button', async () => {
    const userSelectedGameType = true;
    render(<Header userSelectedGameType={userSelectedGameType} handleOnClick={handleOnClick} />)
    const button = screen.getByText(/switch cards/i);

    userEvent.click(button);
    await waitFor(() => expect(handleOnClick).toBeCalledTimes(1))
  })
})