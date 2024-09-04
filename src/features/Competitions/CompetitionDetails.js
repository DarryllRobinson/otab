import { Box, Button } from '@mui/material';
import { Form, Link as RouterLink, useLoaderData } from 'react-router-dom';
import { competitionService } from './competition.service';

export async function competitionLoader({ params }) {
  const competition = await competitionService.getById(params.competitionId);
  console.log('CompetitionDetails', competition);
  return { competition };
}

export default function CompetitionDetails() {
  const { competition } = useLoaderData();

  return (
    <Form method="get" id="competition-form">
      <p>
        <span>Competition</span>
        <input
          placeholder="Comp name"
          aria-label="Competition name"
          type="text"
          name="name"
          defaultValue={competition?.name}
        />
      </p>
    </Form>
  );
}
