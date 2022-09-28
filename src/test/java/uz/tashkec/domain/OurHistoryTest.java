package uz.tashkec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class OurHistoryTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OurHistory.class);
        OurHistory ourHistory1 = new OurHistory();
        ourHistory1.setId(1L);
        OurHistory ourHistory2 = new OurHistory();
        ourHistory2.setId(ourHistory1.getId());
        assertThat(ourHistory1).isEqualTo(ourHistory2);
        ourHistory2.setId(2L);
        assertThat(ourHistory1).isNotEqualTo(ourHistory2);
        ourHistory1.setId(null);
        assertThat(ourHistory1).isNotEqualTo(ourHistory2);
    }
}
