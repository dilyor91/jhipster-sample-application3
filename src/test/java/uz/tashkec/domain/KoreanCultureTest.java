package uz.tashkec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class KoreanCultureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KoreanCulture.class);
        KoreanCulture koreanCulture1 = new KoreanCulture();
        koreanCulture1.setId(1L);
        KoreanCulture koreanCulture2 = new KoreanCulture();
        koreanCulture2.setId(koreanCulture1.getId());
        assertThat(koreanCulture1).isEqualTo(koreanCulture2);
        koreanCulture2.setId(2L);
        assertThat(koreanCulture1).isNotEqualTo(koreanCulture2);
        koreanCulture1.setId(null);
        assertThat(koreanCulture1).isNotEqualTo(koreanCulture2);
    }
}
