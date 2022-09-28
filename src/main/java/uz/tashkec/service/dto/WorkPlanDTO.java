package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;
import uz.tashkec.domain.enumeration.PlanType;

/**
 * A DTO for the {@link uz.tashkec.domain.WorkPlan} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WorkPlanDTO implements Serializable {

    private Long id;

    private String titleUz;

    private String titleRu;

    private String titleKr;

    private String contentUz;

    private String contentRu;

    private String contentKr;

    private PlanType planType;

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

    public String getContentUz() {
        return contentUz;
    }

    public void setContentUz(String contentUz) {
        this.contentUz = contentUz;
    }

    public String getContentRu() {
        return contentRu;
    }

    public void setContentRu(String contentRu) {
        this.contentRu = contentRu;
    }

    public String getContentKr() {
        return contentKr;
    }

    public void setContentKr(String contentKr) {
        this.contentKr = contentKr;
    }

    public PlanType getPlanType() {
        return planType;
    }

    public void setPlanType(PlanType planType) {
        this.planType = planType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WorkPlanDTO)) {
            return false;
        }

        WorkPlanDTO workPlanDTO = (WorkPlanDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, workPlanDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WorkPlanDTO{" +
            "id=" + getId() +
            ", titleUz='" + getTitleUz() + "'" +
            ", titleRu='" + getTitleRu() + "'" +
            ", titleKr='" + getTitleKr() + "'" +
            ", contentUz='" + getContentUz() + "'" +
            ", contentRu='" + getContentRu() + "'" +
            ", contentKr='" + getContentKr() + "'" +
            ", planType='" + getPlanType() + "'" +
            "}";
    }
}
