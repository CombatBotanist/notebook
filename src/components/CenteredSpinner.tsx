import { Box, Spinner } from '@cloudscape-design/components';

export default function CenteredSpinner() {
  return (
    <Box textAlign='center'>
      <Spinner size='large' />
    </Box>
  );
}
