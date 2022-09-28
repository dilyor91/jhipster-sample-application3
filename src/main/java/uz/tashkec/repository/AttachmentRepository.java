package uz.tashkec.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.tashkec.domain.Attachment;

/**
 * Spring Data JPA repository for the Attachment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {}
