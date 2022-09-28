package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class CenterStructureDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CenterStructureDTO.class);
        CenterStructureDTO centerStructureDTO1 = new CenterStructureDTO();
        centerStructureDTO1.setId(1L);
        CenterStructureDTO centerStructureDTO2 = new CenterStructureDTO();
        assertThat(centerStructureDTO1).isNotEqualTo(centerStructureDTO2);
        centerStructureDTO2.setId(centerStructureDTO1.getId());
        assertThat(centerStructureDTO1).isEqualTo(centerStructureDTO2);
        centerStructureDTO2.setId(2L);
        assertThat(centerStructureDTO1).isNotEqualTo(centerStructureDTO2);
        centerStructureDTO1.setId(null);
        assertThat(centerStructureDTO1).isNotEqualTo(centerStructureDTO2);
    }
}
