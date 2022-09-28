package uz.tashkec.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.tashkec.domain.Popup} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PopupDTO implements Serializable {

    private Long id;

    private Boolean isImage;

    private String videoUrl;

    private String redirectUrl;

    private AttachmentDTO attachment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsImage() {
        return isImage;
    }

    public void setIsImage(Boolean isImage) {
        this.isImage = isImage;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
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
        if (!(o instanceof PopupDTO)) {
            return false;
        }

        PopupDTO popupDTO = (PopupDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, popupDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PopupDTO{" +
            "id=" + getId() +
            ", isImage='" + getIsImage() + "'" +
            ", videoUrl='" + getVideoUrl() + "'" +
            ", redirectUrl='" + getRedirectUrl() + "'" +
            ", attachment=" + getAttachment() +
            "}";
    }
}
