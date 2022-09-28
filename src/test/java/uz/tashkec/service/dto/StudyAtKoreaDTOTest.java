package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class StudyAtKoreaDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyAtKoreaDTO.class);
        StudyAtKoreaDTO studyAtKoreaDTO1 = new StudyAtKoreaDTO();
        studyAtKoreaDTO1.setId(1L);
        StudyAtKoreaDTO studyAtKoreaDTO2 = new StudyAtKoreaDTO();
        assertThat(studyAtKoreaDTO1).isNotEqualTo(studyAtKoreaDTO2);
        studyAtKoreaDTO2.setId(studyAtKoreaDTO1.getId());
        assertThat(studyAtKoreaDTO1).isEqualTo(studyAtKoreaDTO2);
        studyAtKoreaDTO2.setId(2L);
        assertThat(studyAtKoreaDTO1).isNotEqualTo(studyAtKoreaDTO2);
        studyAtKoreaDTO1.setId(null);
        assertThat(studyAtKoreaDTO1).isNotEqualTo(studyAtKoreaDTO2);
    }
}
