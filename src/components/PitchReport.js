import React from 'react';
import { Textarea } from '@chakra-ui/react';

const PitchReport = ({ pitchReport, setPitchReport }) => {
  return (
    <Textarea
      value={pitchReport}
      onChange={(e) => setPitchReport(e.target.value)}
      placeholder="Enter pitch report here"
      size="md"
      resize="vertical"
    />
  );
};

export default PitchReport;
