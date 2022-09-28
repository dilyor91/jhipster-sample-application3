package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class FileTopicDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FileTopicDTO.class);
        FileTopicDTO fileTopicDTO1 = new FileTopicDTO();
        fileTopicDTO1.setId(1L);
        FileTopicDTO fileTopicDTO2 = new FileTopicDTO();
        assertThat(fileTopicDTO1).isNotEqualTo(fileTopicDTO2);
        fileTopicDTO2.setId(fileTopicDTO1.getId());
        assertThat(fileTopicDTO1).isEqualTo(fileTopicDTO2);
        fileTopicDTO2.setId(2L);
        assertThat(fileTopicDTO1).isNotEqualTo(fileTopicDTO2);
        fileTopicDTO1.setId(null);
        assertThat(fileTopicDTO1).isNotEqualTo(fileTopicDTO2);
    }
}
