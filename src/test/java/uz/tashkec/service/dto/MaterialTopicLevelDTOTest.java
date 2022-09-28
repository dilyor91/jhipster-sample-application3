package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class MaterialTopicLevelDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialTopicLevelDTO.class);
        MaterialTopicLevelDTO materialTopicLevelDTO1 = new MaterialTopicLevelDTO();
        materialTopicLevelDTO1.setId(1L);
        MaterialTopicLevelDTO materialTopicLevelDTO2 = new MaterialTopicLevelDTO();
        assertThat(materialTopicLevelDTO1).isNotEqualTo(materialTopicLevelDTO2);
        materialTopicLevelDTO2.setId(materialTopicLevelDTO1.getId());
        assertThat(materialTopicLevelDTO1).isEqualTo(materialTopicLevelDTO2);
        materialTopicLevelDTO2.setId(2L);
        assertThat(materialTopicLevelDTO1).isNotEqualTo(materialTopicLevelDTO2);
        materialTopicLevelDTO1.setId(null);
        assertThat(materialTopicLevelDTO1).isNotEqualTo(materialTopicLevelDTO2);
    }
}
