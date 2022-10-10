package uz.tashkec.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link uz.tashkec.domain.Partner} entity.
 */
@Schema(description = "Партнеры")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PartnerDTO implements Serializable {

    private Long id;

    @Size(max = 1024)
    private String titleUz;

    @Size(max = 1024)
    private String titleRu;

    @Size(max = 1024)
    private String titleKr;

    @Size(max = 1024)
    private String webUrl;

    @Size(max = 256)
    private String youtubeUrl;

    private AttachmentDTO attachment;

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

    public String getWebUrl() {
        return webUrl;
    }

    public void setWebUrl(String webUrl) {
        this.webUrl = webUrl;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }

    public AttachmentDTO getAttachment() {
        return attachment;
    }

    public void setAttachment(AttachmentDTO attachment) {
        this.attachment = attachment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PartnerDTO)) {
            return false;
        }

        PartnerDTO partnerDTO = (PartnerDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, partnerDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PartnerDTO{" +
            "id=" + getId() +
            ", titleUz='" + getTitleUz() + "'" +
            ", titleRu='" + getTitleRu() + "'" +
            ", titleKr='" + getTitleKr() + "'" +
            ", webUrl='" + getWebUrl() + "'" +
            ", youtubeUrl='" + getYoutubeUrl() + "'" +
            ", attachment=" + getAttachment() +
            "}";
    }
}
