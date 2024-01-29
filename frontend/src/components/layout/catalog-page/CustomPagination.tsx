import { Box, Typography, Pagination as MuiPagination } from "@mui/material";
import { MetaData } from "../../../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({ metaData, onPageChange }: Props) => {
  const { currentPage, totalPages, totalCount, pageSize } = metaData;

  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1} - {currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
      </Typography>
      <MuiPagination
        color="secondary"
        size="large"
        count={totalPages}
        page={currentPage}
        onChange={(_e, page) => onPageChange(page)}
      />
    </Box>
  );
};

export default CustomPagination;
