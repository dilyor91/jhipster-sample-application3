package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class OurHistoryDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OurHistoryDTO.class);
        OurHistoryDTO ourHistoryDTO1 = new OurHistoryDTO();
        ourHistoryDTO1.setId(1L);
        OurHistoryDTO ourHistoryDTO2 = new OurHistoryDTO();
        assertThat(ourHistoryDTO1).isNotEqualTo(ourHistoryDTO2);
        ourHistoryDTO2.setId(ourHistoryDTO1.getId());
        assertThat(ourHistoryDTO1).isEqualTo(ourHistoryDTO2);
        ourHistoryDTO2.setId(2L);
        assertThat(ourHistoryDTO1).isNotEqualTo(ourHistoryDTO2);
        ourHistoryDTO1.setId(null);
        assertThat(ourHistoryDTO1).isNotEqualTo(ourHistoryDTO2);
    }
}
