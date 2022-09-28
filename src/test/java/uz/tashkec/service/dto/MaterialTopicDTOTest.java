package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class MaterialTopicDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialTopicDTO.class);
        MaterialTopicDTO materialTopicDTO1 = new MaterialTopicDTO();
        materialTopicDTO1.setId(1L);
        MaterialTopicDTO materialTopicDTO2 = new MaterialTopicDTO();
        assertThat(materialTopicDTO1).isNotEqualTo(materialTopicDTO2);
        materialTopicDTO2.setId(materialTopicDTO1.getId());
        assertThat(materialTopicDTO1).isEqualTo(materialTopicDTO2);
        materialTopicDTO2.setId(2L);
        assertThat(materialTopicDTO1).isNotEqualTo(materialTopicDTO2);
        materialTopicDTO1.setId(null);
        assertThat(materialTopicDTO1).isNotEqualTo(materialTopicDTO2);
    }
}
