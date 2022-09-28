package uz.tashkec.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import uz.tashkec.web.rest.TestUtil;

class CenterStructureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CenterStructure.class);
        CenterStructure centerStructure1 = new CenterStructure();
        centerStructure1.setId(1L);
        CenterStructure centerStructure2 = new CenterStructure();
        centerStructure2.setId(centerStructure1.getId());
        assertThat(centerStructure1).isEqualTo(centerStructure2);
        centerStructure2.setId(2L);
        assertThat(centerStructure1).isNotEqualTo(centerStructure2);
        centerStructure1.setId(null);
        assertThat(centerStructure1).isNotEqualTo(centerStructure2);
    }
}
