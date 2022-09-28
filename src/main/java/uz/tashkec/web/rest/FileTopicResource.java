package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.FileTopicRepository;
import uz.tashkec.service.FileTopicService;
import uz.tashkec.service.dto.FileTopicDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.FileTopic}.
 */
@RestController
@RequestMapping("/api")
public class FileTopicResource {

    private final Logger log = LoggerFactory.getLogger(FileTopicResource.class);

    private static final String ENTITY_NAME = "fileTopic";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FileTopicService fileTopicService;

    private final FileTopicRepository fileTopicRepository;

    public FileTopicResource(FileTopicService fileTopicService, FileTopicRepository fileTopicRepository) {
        this.fileTopicService = fileTopicService;
        this.fileTopicRepository = fileTopicRepository;
    }

    /**
     * {@code POST  /file-topics} : Create a new fileTopic.
     *
     * @param fileTopicDTO the fileTopicDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fileTopicDTO, or with status {@code 400 (Bad Request)} if the fileTopic has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/file-topics")
    public ResponseEntity<FileTopicDTO> createFileTopic(@RequestBody FileTopicDTO fileTopicDTO) throws URISyntaxException {
        log.debug("REST request to save FileTopic : {}", fileTopicDTO);
        if (fileTopicDTO.getId() != null) {
            throw new BadRequestAlertException("A new fileTopic cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FileTopicDTO result = fileTopicService.save(fileTopicDTO);
        return ResponseEntity
            .created(new URI("/api/file-topics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /file-topics/:id} : Updates an existing fileTopic.
     *
     * @param id the id of the fileTopicDTO to save.
     * @param fileTopicDTO the fileTopicDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fileTopicDTO,
     * or with status {@code 400 (Bad Request)} if the fileTopicDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fileTopicDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/file-topics/{id}")
    public ResponseEntity<FileTopicDTO> updateFileTopic(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody FileTopicDTO fileTopicDTO
    ) throws URISyntaxException {
        log.debug("REST request to update FileTopic : {}, {}", id, fileTopicDTO);
        if (fileTopicDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fileTopicDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fileTopicRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        FileTopicDTO result = fileTopicService.update(fileTopicDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fileTopicDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /file-topics/:id} : Partial updates given fields of an existing fileTopic, field will ignore if it is null
     *
     * @param id the id of the fileTopicDTO to save.
     * @param fileTopicDTO the fileTopicDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fileTopicDTO,
     * or with status {@code 400 (Bad Request)} if the fileTopicDTO is not valid,
     * or with status {@code 404 (Not Found)} if the fileTopicDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the fileTopicDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/file-topics/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<FileTopicDTO> partialUpdateFileTopic(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody FileTopicDTO fileTopicDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update FileTopic partially : {}, {}", id, fileTopicDTO);
        if (fileTopicDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fileTopicDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fileTopicRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<FileTopicDTO> result = fileTopicService.partialUpdate(fileTopicDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fileTopicDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /file-topics} : get all the fileTopics.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fileTopics in body.
     */
    @GetMapping("/file-topics")
    public List<FileTopicDTO> getAllFileTopics() {
        log.debug("REST request to get all FileTopics");
        return fileTopicService.findAll();
    }

    /**
     * {@code GET  /file-topics/:id} : get the "id" fileTopic.
     *
     * @param id the id of the fileTopicDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fileTopicDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/file-topics/{id}")
    public ResponseEntity<FileTopicDTO> getFileTopic(@PathVariable Long id) {
        log.debug("REST request to get FileTopic : {}", id);
        Optional<FileTopicDTO> fileTopicDTO = fileTopicService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fileTopicDTO);
    }

    /**
     * {@code DELETE  /file-topics/:id} : delete the "id" fileTopic.
     *
     * @param id the id of the fileTopicDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/file-topics/{id}")
    public ResponseEntity<Void> deleteFileTopic(@PathVariable Long id) {
        log.debug("REST request to delete FileTopic : {}", id);
        fileTopicService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
