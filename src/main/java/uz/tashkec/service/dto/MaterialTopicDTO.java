package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.MaterialTopic} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MaterialTopicDTO implements Serializable {

    private Long id;

    private String titleUz;

    private String titleRu;

    private String titleKr;

    private MaterialTopicLevelDTO materialTopicLevel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitleUz() {
        return titleUz;
    }

    public void setTitleUz(String titleUz) {
        this.titleUz = titleUz;
    }

    public String getTitleRu() {
        return titleRu;
    }

    public void setTitleRu(String titleRu) {
        this.titleRu = titleRu;
    }

    public String getTitleKr() {
        return titleKr;
    }

    public void setTitleKr(String titleKr) {
        this.titleKr = titleKr;
    }

    public MaterialTopicLevelDTO getMaterialTopicLevel() {
        return materialTopicLevel;
    }

    public void setMaterialTopicLevel(MaterialTopicLevelDTO materialTopicLevel) {
        this.materialTopicLevel = materialTopicLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MaterialTopicDTO)) {
            return false;
        }

        MaterialTopicDTO materialTopicDTO = (MaterialTopicDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, materialTopicDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MaterialTopicDTO{" +
            "id=" + getId() +
            ", titleUz='" + getTitleUz() + "'" +
            ", titleRu='" + getTitleRu() + "'" +
            ", titleKr='" + getTitleKr() + "'" +
            ", materialTopicLevel=" + getMaterialTopicLevel() +
            "}";
    }
}
