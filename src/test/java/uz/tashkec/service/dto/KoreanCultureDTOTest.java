package uz.tashkec.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class KoreanCultureDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KoreanCultureDTO.class);
        KoreanCultureDTO koreanCultureDTO1 = new KoreanCultureDTO();
        koreanCultureDTO1.setId(1L);
        KoreanCultureDTO koreanCultureDTO2 = new KoreanCultureDTO();
        assertThat(koreanCultureDTO1).isNotEqualTo(koreanCultureDTO2);
        koreanCultureDTO2.setId(koreanCultureDTO1.getId());
        assertThat(koreanCultureDTO1).isEqualTo(koreanCultureDTO2);
        koreanCultureDTO2.setId(2L);
        assertThat(koreanCultureDTO1).isNotEqualTo(koreanCultureDTO2);
        koreanCultureDTO1.setId(null);
        assertThat(koreanCultureDTO1).isNotEqualTo(koreanCultureDTO2);
    }
}
