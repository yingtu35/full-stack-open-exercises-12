import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Todo from './Todo'

const todo = {
    text: "A test todo item",
    done: false
}

describe('A todo component', () => {
    beforeEach(() => {
    })
    
    test('load and display its text', async () => {
        render(<Todo todo={todo} onClickDelete={()=>{}} onClickComplete={()=>{}} />)
        expect(screen.getByText('A test todo item')).toBeDefined()
        expect(screen.getByText('This todo is not done')).toBeDefined()
    })
    
    test('triggers a delete action when pressing delete', async () => {
        const onClickDelete = jest.fn()
        const onClickComplete = jest.fn()
        render(<Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />)
        
        const user = userEvent.setup()
        await user.click(await screen.findByText('Delete'))
        expect(onClickDelete).toHaveBeenCalled()
    })
})