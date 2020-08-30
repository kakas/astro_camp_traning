import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Table, Pagination } from 'semantic-ui-react'
import { initTasks } from './actions'

export default function TaskOverview() {
  const dispatch = useDispatch()
  const taskOverview = useSelector((state) => state.taskOverview)
  const [activePage, setActivePage] = useState(1)

  const handlePageChange = (e, { activePage: newActivepage }) => {
    setActivePage(newActivepage)
    dispatch(initTasks(newActivepage))
  }

  useEffect(() => {
    dispatch(initTasks(activePage))
  }, [])

  return (
    <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell>Start Time</Table.HeaderCell>
            <Table.HeaderCell>End Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {taskOverview.tasks.map((task) => {
            return (
              <Table.Row key={task.id}>
                <Table.Cell>{task.id} </Table.Cell>
                <Table.Cell>{task.title} </Table.Cell>
                <Table.Cell>{task.content}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>{task.priority}</Table.Cell>
                <Table.Cell>{task.start_time}</Table.Cell>
                <Table.Cell>{task.end_time}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="7">
              <Pagination
                activePage={activePage}
                totalPages={taskOverview.totalPages}
                onPageChange={handlePageChange}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  )
}
